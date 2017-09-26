import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
      BaseApplicationCustomizer, 
      PlaceholderContent,
      PlaceholderName
    } from '@microsoft/sp-application-base';
import{SPPermission} from '@microsoft/sp-page-context';
import{
        SPHttpClient,
        SPHttpClientConfiguration,
        SPHttpClientResponse
      } from '@microsoft/sp-http';
import * as strings from 'CgkListHeaderApplicationCustomizerStrings';
import styles from './AppCustomizer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset'; 

const LOG_SOURCE: string = 'CgkListHeaderApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICgkListHeaderApplicationCustomizerProperties {
  // This is an example; replace with your own property
      Top: string;
      //Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class CgkListHeaderApplicationCustomizer
  extends BaseApplicationCustomizer<ICgkListHeaderApplicationCustomizerProperties> {
    // These have been added
        private _topPlaceholder: PlaceholderContent | undefined;
        //private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Added to handle possible changes on the existence of placeholders.
          this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

          //Check the Permissions and webProperties
          console.log( 'The web template for this site is: ' + this.context.pageContext.web.templateName.toString());         
          console.log( 'This user has ManageWeb permission on this web: ' + this.context.pageContext.web.permissions.hasPermission(SPPermission.manageWeb));
          this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/AllProperties`,  
      SPHttpClient.configurations.v1)  
      .then((response: SPHttpClientResponse) => {  
        response.json().then((responseJSON: any) => {  
          console.log(responseJSON);
         var props = responseJSON;  
        });  
      });
     

          // Call render method for generating the HTML elements.
          this._renderPlaceHolders();
          return Promise.resolve<void>();
  }
  private _renderPlaceHolders(): void {

          console.log('CGKListHeaderApplicationCustomizer._renderPlaceHolders()');
          console.log('Available placeholders: ',
        this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));

          // Handling the top placeholder
          if (!this._topPlaceholder) {
        this._topPlaceholder =
          this.context.placeholderProvider.tryCreateContent(
            PlaceholderName.Top,
            { onDispose: this._onDispose });

        // The extension should not assume that the expected placeholder is available.
        if (!this._topPlaceholder) {
          console.error('The expected placeholder (Top) was not found.');
          return;
        }

        if (this.properties) {
          let topString: string = this.properties.Top;
          if (!topString) {
            topString = '(Top property was not defined.)';
          }

          if (this._topPlaceholder.domElement) {
            this._topPlaceholder.domElement.innerHTML = `
              <div class="${styles.app}">
                <div class="ms-bgColor-themeDark ms-fontColor-white ${styles.top}">
                              <div class="btn-group">
                                <div class="cgk-list-btn" style="display:inline-block">
                                  <button>Button1</button>
                                  </div>
                                  <div class="cgk-list-btn" style="display:inline-block">
                                  <button>Button2</button>
                                  </div>
                                  <div class="cgk-list-btn" style="display:inline-block">
                                  <button>Button3</button>
                                  </div>
                                </div>                  
                </div>
              </div>`;
          }
        }
          }

     
        }
        private _onDispose(): void {
          console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
        }

}


