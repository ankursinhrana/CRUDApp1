import { Component } from '@angular/core';

@Component({
  selector: 'app-button-renderer',
  // templateUrl: './button-renderer.component.html',
  // styleUrls: ['./button-renderer.component.css']
  template: `<button type="button" class="btn btn-link" (click)="onClick($event)">{{label}}</button>`
})
export class ButtonRendererComponent {

  params:any;
  label: any;

  agInit(params:any): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event:any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      };
      this.params.onClick(params);
    }
  }


}
