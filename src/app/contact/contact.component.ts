import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public myForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      anyo: ['', [Validators.required]],
      poblacion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(9)]],
      mensaje: ['', [Validators.required]],
    });
   }

  ngOnInit(): void {
  }
  saveData(){
    //Tratamiento de la información del formulario de contacto
    console.log(this.myForm.value);
  }
}
