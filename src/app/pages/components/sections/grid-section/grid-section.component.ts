import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-section',
  templateUrl: './grid-section.component.html',
  styleUrl: './grid-section.component.css'
})
export class GridSectionComponent {
  codes = {
    basic: `<div class="row">\n  <div class="col-6">col-6</div>\n  <div class="col-6">col-6</div>\n</div>\n<div class="row">\n  <div class="col-4">col-4</div>\n  <div class="col-4">col-4</div>\n  <div class="col-4">col-4</div>\n</div>\n<div class="row">\n  <div class="col-3">col-3</div>\n  <div class="col-3">col-3</div>\n  <div class="col-3">col-3</div>\n  <div class="col-3">col-3</div>\n</div>`,
    auto: `<div class="row">\n  <div class="col">Equal</div>\n  <div class="col">Equal</div>\n  <div class="col">Equal</div>\n</div>`,
    responsive: `<div class="row">\n  <div class="col-sm-12 col-md-6 col-lg-4">Responsive</div>\n  <div class="col-sm-12 col-md-6 col-lg-4">Responsive</div>\n  <div class="col-sm-12 col-md-6 col-lg-4">Responsive</div>\n</div>`,
    offset: `<div class="row">\n  <div class="col-4">col-4</div>\n  <div class="col-4 col-offset-4">col-4 offset-4</div>\n</div>\n<div class="row">\n  <div class="col-6 col-offset-3">col-6 offset-3</div>\n</div>`,
    nested: `<div class="row">\n  <div class="col-8">\n    Parent col-8\n    <div class="row">\n      <div class="col-6">Nested col-6</div>\n      <div class="col-6">Nested col-6</div>\n    </div>\n  </div>\n  <div class="col-4">col-4</div>\n</div>`
  };
}
