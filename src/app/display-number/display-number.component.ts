import { Component, OnInit, Input, ElementRef, Renderer2, ViewChild, DoCheck } from '@angular/core';

@Component({
  selector: 'app-display-number',
  templateUrl: './display-number.component.html',
  styleUrls: ['./display-number.component.css']
})
export class DisplayNumberComponent implements OnInit, DoCheck {

  @Input() number: number;
  @Input() index: number;
  @Input() maxHeight: number;
  @Input() maxWidth: number;
  @Input() arrayLength: number;
  @Input() active = false;
  @ViewChild('div') div: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() { }

  ngDoCheck() {
    this.setheight();      
  }

  setheight () {
    this.renderer.setStyle(this.div.nativeElement, 'height', (this.maxHeight / this.arrayLength) * this.number + 'px');
    this.renderer.setStyle(this.div.nativeElement, 'width', ((this.maxWidth - this.arrayLength) / this.arrayLength) + 'px');
  }

}
