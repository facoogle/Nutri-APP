import React from 'react';
import "./imcalculator.css"
import { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import swal from 'sweetalert';
import { addCalculator } from '../../../redux/actions/useractions';
import flaquito from "./images/flaquito.png"
import gordito from "./images/gordito.png"
import gordo from "./images/gordo.png"
import normal from "./images/normal.png" //entre comillas
import rellenito from "./images/rellenito.png"
import status from "./images/status.png"
import {NavBar} from "../nav/nav"




export const CalculatorIMC= ()=>{

  const dispatch = useDispatch()

  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imgEjemplo, setImgEjemplo] = useState(status)

  const user = window.sessionStorage.getItem("user")
  let userLogged
  if(user){
   userLogged = JSON.parse(user)
}

  const [mensagem, setMensagem] = useState("");
  const [efeitos, setEfeitos] = useState("");
  const [imcMessage, setImcMessage] = useState("");

  function calcularIMC (){


    const alt = altura / 100; 
    const imc = peso / (alt * alt);

    if(altura === "" && peso === ""){
      swal("Please insert your weight and height");
    }
    else if (isNaN(altura) && isNaN(peso)) {
      swal('You must enter the data correctly');
    }
    else if(!alt){
      swal("You must enter only numbers !");
        
    }else if (imc < 16.9){
     setMensagem(`You are very underweight!`);
     setEfeitos(`Side effects: hair loss, infertility, missed menstrual periods.`);
     setImcMessage(`Your IBM is : ${imc.toFixed(2)}`);
     setImgEjemplo(flaquito)

     
   }else if(imc >= 17 && imc < 18.4){
    setMensagem(`you are underweight !`);
    setEfeitos(`Side effects: fatigue, stress, anxiety.`);
    setImcMessage(`Your BMI is: ${imc.toFixed(2)}`);
    setImgEjemplo(flaquito)
     
   }else if (imc >= 18.5 && imc < 24.9){
    setMensagem(`You are normal weight !`);
    setEfeitos(`Side effects: lower risk of heart and vascular diseases.`);
    setImcMessage(`Your BMI is: ${imc.toFixed(2)}`);
    setImgEjemplo(normal)
    
   }else if(imc >= 25 && imc < 29.9){
    setMensagem(`Are you overweight? !`);
    setEfeitos(`Side effects: lower risk of heart and vascular diseases.`);
    setImcMessage(`Your BMI is: ${imc.toFixed(2)}`);
    setImgEjemplo(rellenito)
     
   }else if(imc >= 30 && imc < 34.9){
    setMensagem(`You have Obesity Grade I!`);
    setEfeitos(`Side effects: sleep apnea, shortness of breath.`);
    setImcMessage(`Your BMI is: ${imc.toFixed(2)}`);
    setImgEjemplo(gordito)

   }else if(imc >= 35 && imc < 40){
    setMensagem(`You have Obesity Grade II!`);
    setEfeitos(`Side effects: diabetes, angina pectoris, myocardial infarction, atherosclerosis`);
    setImcMessage(`Your BMI is: ${imc.toFixed(2)}`);
    setImgEjemplo(gordo)
   }else if(imc >= 40){
    setMensagem(`You have Grade III Obesity !`);
    setEfeitos(`Side effects: reflux, difficulty moving, bedsores, diabetes, heart attack, stroke.`);
    setImcMessage(`Your BMI is: ${imc.toFixed(2)}`);
    setImgEjemplo(gordo)
   }
    
  }

  const userId = userLogged?userLogged.id:"nada";

  const handleCalculator = (e) =>{
      e.preventDefault()
      dispatch(addCalculator({userId,peso,altura,imcMessage}))
      setImcMessage("")
      setPeso("")
      setAltura("")
      setEfeitos("SAVE IN YOUR PROFILE SUCCESS !!!")
      setMensagem(``);
  }

    
  return(
    <div>
      <NavBar/>
    <div className='IMC'>
   <div className="imc-calculator">
      <div className="area-input-calculator">
      <h1>BMI calculator</h1>
      <span>Let's Calculate your BMI ?</span>
          <input 
            className='form-control'
            type="text"
            placeholder="Weight in KG Ex: 75"
            value={peso}
            onChange={ (e) => setPeso(e.target.value) }
          />

          <input 
            className='form-control'
            type="text"
            placeholder="Height in CM Ex: 170"
            value={altura}
            onChange={ (e) => setAltura(e.target.value) }
          />

          <button className="btn btn-primary" onClick={calcularIMC}> 
            Calculate
          </button>
          <div className='messagesImc'>
            <h2>
                {mensagem} <br/>
                {efeitos} <br/>
                
            </h2>
            <h3>
            {imcMessage}
            </h3>
            </div>
      </div>
      <img className='imgRef' src={imgEjemplo}></img>
      <div>
        
      </div>
      <button className="btn btn-secondary" disabled={imcMessage.length === 0 || peso.length === 0 || altura.length === 0} onClick={handleCalculator} >Save </button>
      <a className="btn btn-primary" href='/me'>GoToProfile!</a>
   </div>
   
   </div>
   </div>
  );
}

