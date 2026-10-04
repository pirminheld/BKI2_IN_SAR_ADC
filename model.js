(function(root){
 'use strict';
 function convert(input,bits,ref){
  if(!Number.isFinite(input)||!Number.isInteger(bits)||bits<2||bits>12||!Number.isFinite(ref)||ref<=0||input<0||input>ref) throw new RangeError('Ungültige ADC-Einstellung');
  const count=2**bits,step=ref/count,trace=[]; let code=0,low=0,high=ref;
  for(let bit=bits-1;bit>=0;bit--){
   const weight=2**bit,trial=code+weight,voltage=trial*step,keep=input>=voltage;
   if(keep){code=trial;low=voltage;}else high=voltage;
   trace.push({bit,weight,trial,voltage,keep,code,low,high});
  }
  return {input,bits,ref,count,step,code,binary:code.toString(2).padStart(bits,'0'),low:code*step,high:(code+1)*step,mid:(code+.5)*step,trace};
 }
 const api={convert}; if(typeof module!=='undefined'&&module.exports)module.exports=api; else root.SAR=api;
})(typeof window!=='undefined'?window:this);
