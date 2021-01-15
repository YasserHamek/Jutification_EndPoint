
export class Justification {
    private paragraphArray: string[] = [];
    private textArray: string[] = [];
    private finalText: string[] = [];
    
    constructor(){}

    MainJustificationMethod(text: string): string[]{
        
        if(text.includes('\n')){
            this.paragraphArray = text.split('\n');   
        }else{
            this.paragraphArray.push(text);
        } 

        this.paragraphArray = this.paragraphArray.map((value)=>value.concat('\n'));

        //calling SlicingTextMethod
        this.paragraphArray.forEach((value) => this.SlicingText(value))

        //calling justifyLine method
        this.textArray.forEach((value) => this.finalText.push(this.justifyLine(value)));
        
        return this.finalText;
    }

    //slice the text in small texts, return an array of small texts 
    SlicingText(text: string): string[]{
        let editedText: string = text;
        let spanIndex: number = 0;
        let isEndOfText: boolean = false;
        
        //repeating the slicing operation to have string's of 80 caracter or lesser
        while(!isEndOfText){

            if (editedText.length>80){

                if(editedText.charAt(79)==' '){
                    //the case where this line end with span
                    this.textArray.push(editedText.slice(0,80))
                    editedText= editedText.slice(79,editedText.length)
                }else {
                    //finding the span in the text
                    let i : number = 0;
                    let condition: boolean = false;
            
                    while(!condition && i<79){
                        i++;
                        if(editedText.charAt(79-i)==' '){
                            condition = true;
                            spanIndex=i;
                        }
                    }
                    //checking if the word does not contains 79 caracter
                    if(spanIndex==80){
                        this.textArray.push(editedText.slice(0,80));
                        editedText= editedText.slice(79,editedText.length);
                    } else {
                        this.textArray.push(editedText.slice(0,80-spanIndex))
                        editedText= editedText.slice(80-spanIndex,editedText.length)  
                    }
                }

            }else {
                this.textArray.push(editedText);
                isEndOfText=true;
            }
        }
        return this.textArray;
    }

    //Second step : making the space in the strings equal as possible 
    justifyLine(line: string): string{
        let outPutLine = line;
        let numberOfSpan: number = 0;
        
        if(outPutLine.charAt(outPutLine.length)=='\n'){
            return outPutLine;
        }else {
            outPutLine = outPutLine.trim();
            numberOfSpan = 80 - outPutLine.length;

            if(numberOfSpan==0){
                return outPutLine;
            }else {
                outPutLine = this.AddingSpanToLine(outPutLine,numberOfSpan);
                return outPutLine;
            }
        }
    }

    AddingSpanToLine(line: string, spanNumber: number): string{
        let spanNum: number = spanNumber;
        let inPutLine: string = line;
        let outPutLine: string = '';
        let i: number = 0;

        while(i<spanNum*2){
            if(i%2==0){
                outPutLine= outPutLine.concat(inPutLine.slice(0,inPutLine.search(' ')+1)+' ');
                inPutLine = inPutLine.slice(inPutLine.search(' ')+1);
            }else {
                outPutLine= outPutLine.concat(inPutLine.slice(0,inPutLine.search(' ')+1));
                inPutLine = inPutLine.slice(inPutLine.search(' ')+1);
            }
            i++;
        }

        if(inPutLine.length>1){
            outPutLine= outPutLine.concat(inPutLine);
        }
        return outPutLine;
    }

}

//some test
let justifyClass: Justification = new Justification();
let arrayText: string[]= [];
let text: string;

text='Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint. \n Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé. Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour.'

let text2='hello algorithme justification hello algorithme justification hello algorithme justification hello algorithme justification hello algorithme justification hello algorithme justification hello algorithme justification '
//console.log(text.length)

//addingSpans
//console.log(justifyClass.AddingSpanToLine(text,4))

//justification
let paragraphe = justifyClass.MainJustificationMethod(text);
let paragraphe2 = justifyClass.AddingSpanToLine(text2,10);

console.log(paragraphe);

//Slicing Text Test
/*
arrayText=justifyClass.SlicingText(paragraphe[i]);

console.log(text.length)
console.log(arrayText)
console.log(arrayText[0].length)*/
