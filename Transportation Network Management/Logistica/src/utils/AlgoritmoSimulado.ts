import { isDate } from "moment";
import { Result } from "../core/logic/Result";

export  class AlgoritmoSimulado {

    public static planeamentoSimulado(arrArmazens: string[], arrEntregas: string[], arrCamioes: string[]): Result<any>{

        //=================== Array armazens ==========================
        var armazens= [];
        if (arrArmazens == null){
            return Result.fail<Object>("Ocorreu um erro ao receber armazens");
        }else{
            for (let index = 0; index < arrArmazens.length; index++) {
                const element = arrArmazens[index];   
                const idesig = element.indexOf('designacao');    
                const y = idesig + 13;  
                const imorada = element.indexOf('morada'); 
                var armazem = {id: element.slice(7,10), designacao: element.slice(y,imorada-3)};
                armazens.push(armazem);
            }
        };
        console.log(armazens);

        //=================== Array Entregas =================================
        var entregas= [];
        if (arrEntregas == null){
            return Result.fail<Object>("Ocorreu um erro ao receber entregas");
        }else{
            for (let index = 0; index < arrEntregas.length; index++) {
                const element = arrEntregas[index];     
                const iarmId = element.indexOf('armazemId');
                const y = iarmId + 12;
                const imassa = element.indexOf('massa');
                const x = imassa + 7;
                const x1 = iarmId-2;
                
                var entrega = {id: element.slice(7,10), idArmazem: element.slice(y,y+3), massa: Number(element.slice(x,x1))};
                entregas.push(entrega);
            }
        };
        console.log(entregas);

       
        //=================== Array Camioes =================================
        var camioes= [];
        if (arrCamioes == null){
             return Result.fail<Object>("Ocorreu um erro ao receber camioes");
        }else{
            for (let index = 0; index < arrCamioes.length; index++) {
                const element = arrCamioes[index];         
                var camiao = {matricula: element.slice(58,66), cc: 4300};
                camioes.push(camiao);
            }
        };
       console.log(camioes);

           
        //camioes com as entregas carregadas
        let camioes_armazens_entregas;
   
       //==== Distribuição de entregas pelos camiões ======
           //massa total de entregas 
           var massaTotalEntregas = 0;
           for(var i =0; i<entregas.length; i++){
               massaTotalEntregas = entregas[i].massa + massaTotalEntregas;
           }
           
           //numero de camioes necessarios
           var ncamioes = massaTotalEntregas / 4300;
           var numeroCamioes = 0;
           
           if(ncamioes <= 1){
            numeroCamioes = 1;
           }else{
            if(ncamioes <= 2 ){
                numeroCamioes = 2;
            }else{
                if(ncamioes <= 3){
                    numeroCamioes = 3;
                }
            }
           }
    
           console.log("Massa Total: " + massaTotalEntregas);
           console.log(ncamioes);
           console.log("Numero Camioes: " + numeroCamioes);
   
           var c=0;
           var pesoAtualCamiao = 0;
           var verificarPeso = 0;
           var arms = [];
           var entrg;
           var arm;
           var cam = [];
           var b=0;
         
           //Distribuição de Carga
           for (var i=0; i<numeroCamioes; i++){
               
               for (var j=0; j<entregas.length; j++){
               //verficar se camiao ainda tem peso para a entrega
               verificarPeso = pesoAtualCamiao + entregas[j].massa;
               
                   //caso o camiao ainda tenha capacidade entao agrega a entrega
                   if(verificarPeso <= camioes[i].cc){
                       pesoAtualCamiao = pesoAtualCamiao + entregas[j].massa;
                       entrg = { id: entregas[j].id};
                       
                       //traduzir id de armazens para designação
                       for(var a = 0; a<armazens.length; a++){
                        if(entregas[j].idArmazem == armazens[a].id){
                            arm = armazens[a].designacao;
                        }
                       }
                       arms[b] = { armazem: arm ,entregas: [entrg]};
                       cam[c] = {camiao: camioes[i].matricula, armazens: arms};
                       b++;
                   }
                   //caso a capacidade do camiao já teja sido alcançada, passar para outro camião
                   if(verificarPeso > camioes[i].cc){
                      pesoAtualCamiao = 0; verificarPeso = 0;
                      arms = [];
                      i++;
                      j--;
                      c++;
                      b=0;
                   }
               }
               j++;  
           }
           camioes_armazens_entregas = {planeamento: cam};
         
        return Result.ok<any>(camioes_armazens_entregas);
    }   
}