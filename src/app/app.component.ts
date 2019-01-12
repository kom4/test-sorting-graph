import { Component, OnInit, ViewChild, ElementRef, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'test-sorting';

  constructor() {
    console.log('constructor');
   }
  
  @ViewChild('mainDiv') mainDiv: ElementRef;
  @ViewChild('delayInput') delayInput: ElementRef;  
  @ViewChild('arraySizeInput') arraySizeInput: ElementRef; 
  array: number[] = [];
  iterations: number = null;
  maxHeight: number;
  maxWidth: number;
  arrayLength: number;  
  highlightItemOne: number;
  highlightItemTwo: number;
  defaultArrayLength = 10;
  sorting = false;
  sorted = false;
  delay = null;
  // paused = false;

  ngOnInit() {   
    this.shuffle();
    this.maxHeight = this.mainDiv.nativeElement.clientHeight;
    this.maxWidth = this.mainDiv.nativeElement.clientWidth;   
  }

 

  setArray() {
    this.array = [];  
    const length = Number(this.arraySizeInput.nativeElement.value);  
    if (length > 0) {
      this.arrayLength = length;
    } else {
      this.arrayLength = this.defaultArrayLength;
    }            
    for (let i = 1; i <= this.arrayLength; i++) {
      this.array.push(i);
    }      
  }

  ngDoCheck() { }

  shuffle() {
    this.setArray();
    this.sorted = false;
    this.iterations = null;
    this.highlightItemOne = null;
    this.highlightItemTwo = null;
    if (!this.sorting) {
      let currentIndex = this.arrayLength, temporaryValue: number, randomIndex: number;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = this.array[currentIndex];
        this.array[currentIndex] = this.array[randomIndex];
        this.array[randomIndex] = temporaryValue;
      }
    }
  }

  async sortNumbers () {
    if (!this.sorting) {
      this.delay = this.delayInput.nativeElement.value;
      this.sorting = true;
      this.iterations = 0;
      const length = this.array.length;
      for (let i = 0; i < length; i++) {     
        for (let j = 0; j < (length - i - 1); j++) {
          if (this.array[j] > this.array[j + 1]) { 
            if (this.sorting) {
              await this.switchArrayElements(j); 
            }                                   
          }         
        }    
      }  
      this.sorting = false;
      this.sorted = true;
      // this.paused = false;
    } else {    
      // this.paused = true;
      this.sorting = false;
    }
  }

  switchArrayElements(j: number) { 
    return new Promise((resolve, reject) => {         
      this.iterations++;             
      this.highlightItemOne = j;
      this.highlightItemTwo = j + 1;
      const tmp = this.array[j];
      this.array[j] = this.array[j + 1];
      this.array[j + 1] = tmp;  
      setTimeout(() => {
        resolve(true);
      }, this.delay);
    });   
  }


}
