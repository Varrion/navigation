import {Component, Input, OnInit} from '@angular/core';
import {MenuItemsService} from './menu-items.service';
import {MenuItem} from './MenuItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'navigation';


  @Input() childMenu;

  data: any = null;
  list: MenuItem[] = [];

  constructor(private menuItemsService: MenuItemsService) {
  }

  ngOnInit() {

    this.menuItemsService.getAllMenuItems().subscribe(res => {
      this.data = res;
      this.list = this.importData();
      this.list = this.checkForChilds();

      this.list = this.list.filter(item => {
        return item.ParentID === 'NULL';
      });
    });
  }

  importData() {

    let lines = this.data.split(['\r\n']);
    for (let i = 1; i < lines.length - 1; i++) {
      let menuItem: MenuItem = {ID: 0, LinkURL: '', MenuName: '', ParentID: 0, menuitems: [], isHidden: false};
      let cols = lines[i].split(';');
      menuItem.ID = cols[0];
      menuItem.MenuName = cols[1];
      menuItem.ParentID = cols[2];
      menuItem.isHidden = cols[3];
      menuItem.LinkURL = cols[4];
      this.list.push(menuItem);
    }
    return this.list;
  }

  checkForChilds() {

    this.list
      .filter(item => item.isHidden === 'False')
      .forEach(item => {
        let parent = item.ParentID;
        if (this.list.find(item => item.ID === parent)) {
          let menuItem: MenuItem = this.list.find(x => x.ID === parent);
          menuItem.menuitems.push(item);
        }
      });
    this.list.forEach(item => {
      item.menuitems.sort((a, b) => a.MenuName < b.MenuName ? -1 : a.MenuName > b.MenuName ? 1 : 0);
    });

    return this.list;
  }

}

