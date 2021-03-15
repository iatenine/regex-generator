import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'  

@Component({
  selector: 'app-generator-form',
  templateUrl: './generator-form.component.html',
  styleUrls: ['./generator-form.component.sass']
})

export class GeneratorFormComponent implements OnInit {

  myForm!: FormGroup;
  buildExpression: String = '';
  expressionList: String[] = [];  //Ensures list of all expressions created can be displayed

  constructor() { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      expression: new FormControl(''),
      doesNot: new FormControl(false),
      startsWith: new FormControl(false),
      endsWith: new FormControl(false),
      multiline: new FormControl(false),
      ignoreCase: new FormControl(false),
      isGlobal: new FormControl(false),
    })

    this.myForm.valueChanges.subscribe({
      next: this.updatePreview.bind(this),
      error: this.handleError.bind(this),
    });
  }
  
  //Can do stuff when form values change
  updatePreview() {}

  //Handles error if updatePreview subscription has an error
  handleError(){}

  onSubmit(){
    //Start fresh each time
    this.buildExpression = '';

    this.buildExpression += '/'
    if(this.myForm.value.startsWith)
      this.buildExpression += '^';
    this.buildExpression += '[';
    if(this.myForm.value.doesNot)
      this.buildExpression += '^';
    this.buildExpression += this.myForm.value.expression;
    this.buildExpression += ']';
    if(this.myForm.value.endsWith)
      this.buildExpression += '$';
    this.buildExpression += '/';
    if(this.myForm.value.multiline)
      this.buildExpression += 'm';
    if(this.myForm.value.ignoreCase)
      this.buildExpression += 'i';
    if(this.myForm.value.isGlobal)
      this.buildExpression += 'g';

    this.expressionList.unshift(this.buildExpression);
  }

  clearList(){
    this.expressionList = [];
  }
}
