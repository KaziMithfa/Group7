import { NeoCortexModel, Area, Synapse, Minicolumn, Cell, NeocortexSettings, InputModel, CellId, Location } from './neocortexmodel';


export class neoCortexUtils {



  /**
   * createModel (numberOfAreas/DataSeries, [xAxis, zAxis], yAxis)
   * @param areas 
   * @param miniColDims 
   * @param numLayers 
   */
  public static createModel(areaLevels: number[], miniColDims: number[], numLayers: number): NeoCortexModel {

    let sett: NeocortexSettings = new NeocortexSettings();
    sett.minicolumnDims = miniColDims;
    sett.areaLevels = areaLevels;
    sett.numLayers = numLayers;
  
    let preCell0 = new Cell(sett, null, null,  0, 15, 0, 0);
    let preCell3= new Cell(sett, null, null,   0, 15, 3, 0);

    let postCell1 = new Cell(sett, null, null, 0, 15, 1, 0);
    let postCell4 = new Cell(sett, null, null, 0, 15, 4, 0);  
    


    let inpModel: InputModel = new InputModel(sett);

    let synaps01 = new Synapse(null, 0, preCell0, postCell1);
    let synaps34 = new Synapse(null, 0, preCell3, postCell4);

    var model: NeoCortexModel = new NeoCortexModel(sett, inpModel, 1, 1, 1, [synaps01, synaps34]);


    return model;
  }


  public static addSynapse(model: NeoCortexModel, id: number, areaId: number = 1, preCell: Cell, postCell: Cell, weight: number) {

    model.synapses.push(new Synapse(id, weight, preCell, postCell));

  }

  /*   public static updateSynapse(model: NeoCortexModel, synapseId: number, areaId: number = -1, weight: number) {
  
      let synapse = this.lookupSynapse(model, synapseId, areaId);
      if (synapse != null) {
        synapse.permanence = weight;
      }
      else
        throw "Synapse cannot be found!";
  
    } */

  /* public static updateNeuron(model: NeoCortexModel, id: number, weight: number) {


  } */


  /**
   *  Search for synapse with specified id.
   * @param model 
   * @param synapseId 
   * @param [optional] areaId.If >= 0 then restricts search for area. If not specified, the it search for synapse in all areas.
   */
  /*  public static lookupSynapse(model: NeoCortexModel, synapseId: number, areaId: number = -1): Synapse {
 
     if (areaId >= 0 && model.areas.length > areaId)
       return this.lookupSynapseInArea(model, synapseId, areaId);
 
     model.areas.forEach(area => {
       let synapse = this.lookupSynapseInArea(model, synapseId, area.id);
       if (synapse != null)
         return synapse;
     });
 
     return null;
   } */


  /**
   * Search for synapse with specified id.
   * @param model Model of AI network.
   * @param synapseId Identifier of the synapse.
   * @param areaId Restricts the search in specified area to increase performance.
   */
  /*   private static lookupSynapseInArea(model: NeoCortexModel, synapseId: number, areaId: number): Synapse {
  
      model.areas[areaId].minicolumns.forEach(minColRow => {
        minColRow.forEach(miniColumn => {
          miniColumn.cells.forEach(cell => {
            cell.Synapses.forEach(synapse => {
              if (synapse.id == synapseId)
                return synapse;
            });
          });
        });
      });
  
      return null;
    } */


  /**
   * Search for synapse with specified id.
   * @param model Model of AI network.
   * @param synapseId Identifier of the synapse.
   * @param areaId Restricts the search in specified area to increase performance.
   */
  private static getCell(model: NeoCortexModel, cellId: CellId): Cell {

    let area: Area = model.areas[cellId.area];

    let obj: any[] = area.minicolumns[0];

    for (let i = 1; i < area.minicolumns.length - 1; i++) {
      obj = obj[cellId.minicolumn[i]];
    }

    return obj[area.minicolumns.length - 1] as Cell;
  }
}




