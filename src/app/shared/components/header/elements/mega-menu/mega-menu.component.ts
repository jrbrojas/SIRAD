import { Component, OnInit } from '@angular/core';
import {Menu, NavService} from '../../../../services/nav.service';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss']
})
export class MegaMenuComponent implements OnInit {

  public megaItems!: Menu[];
  public levelMenuItems!: Menu[];

  constructor(public navServices: NavService) {
    this.navServices.megaItems.subscribe(megaItems => this.megaItems = megaItems);
    this.navServices.levelMenuItems.subscribe(levelMenuItems => this.levelMenuItems = levelMenuItems);
  }

  ngOnInit(): void {
  }

  megaMenuToggle() {
    this.navServices.levelMenu = false;
    this.navServices.megaMenu  = !this.navServices.megaMenu;
    if(window.innerWidth < 991) {
      this.navServices.collapseSidebar = true;
    }
  }

  levelMenuToggle() {
    this.navServices.megaMenu  = false;
    this.navServices.levelMenu = !this.navServices.levelMenu;
    if(window.innerWidth < 991) {
      this.navServices.collapseSidebar = true;
    }
  }

  // Click Toggle menu
  toggleNavActive(item: any) {
    if (!item.active) {
      // @ts-ignore
      this.megaItems.forEach(a => {
        if (this.megaItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) { return }
        a.children.forEach(b => {
          // @ts-ignore
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
      });
    }
    item.active = !item.active;
  }
}
