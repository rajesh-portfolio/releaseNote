import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/items";
import * as $ from 'jquery';
import styles from './ReleaseNotes.module.scss';

export interface IProps {
  listName: string;
}

export default class ReleaseNotesWebPart extends BaseClientSideWebPart<IProps> {

  private sp = spfi().using(SPFx(this.context));

  public async render(): Promise<void> {
    this.domElement.innerHTML = `
      <div class="${styles.root}">
        <nav class="${styles.nav}">
          <a data-target="New">New</a>
          <a data-target="Improvement">Improvements</a>
          <a data-target="Fix">Fixes</a>
        </nav>
        <div class="${styles.content}">
          <section id="New"></section>
          <section id="Improvement"></section>
          <section id="Fix"></section>
        </div>
      </div>
    `;

    const items = await this.sp.web.lists
      .getByTitle(this.properties.listName)
      .items
      .filter("IsActive eq 1")();

    ["New", "Improvement", "Fix"].forEach(type => {
      const section = this.domElement.querySelector(`#${type}`)!;
      section.innerHTML = items
        .filter(i => i.Category === type)
        .map(i => `<div><b>${i.Title}</b><div>${i.Description}</div></div>`)
        .join("");
    });

    $(this.domElement).find('nav a').on('click', function () {
      const target = document.getElementById($(this).data('target'));
      target?.scrollIntoView({ behavior: "smooth" });
    });
  }
}
