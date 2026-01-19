import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';

export default class ReleaseNotesChromeApplicationCustomizer
  extends BaseApplicationCustomizer<{}> {

  public onInit(): Promise<void> {
    const style = document.createElement("style");
    style.innerHTML = `
      #spLeftNav,
      div[data-automation-id="pageHeader"] {
        display: none !important;
      }
      #spPageCanvasContent {
        margin-left: 0 !important;
      }
    `;
    document.head.appendChild(style);
    return Promise.resolve();
  }
}
