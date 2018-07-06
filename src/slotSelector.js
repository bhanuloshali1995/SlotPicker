import React from 'react';
import data from './data';
export default class SlotSelector extends React.Component{
    constructor(props){
        super(props);
        this.state={
            hourSlots:[],
            dateSlotsData:[],
            availableSlots:[],
            isApiFetched:false,
            selectedDate:null,
            selectedHour:null,
            selectedSlotId:null,
            message:'',
        }
        this._getDates=this._getDates.bind(this);
        this._showMessage=this._showMessage.bind(this);
        this._getHourSlots=this._getHourSlots.bind(this);
        this._setSlotId=this._setSlotId.bind(this);
        this._getHours=this._getHours.bind(this);
    }
    componentDidMount(){
        let availableSlots=data.available_slots;
        this.setState({availableSlots,isApiFetched:true,selectionColorObj:{color:data.selection_color},secondaryColorObj:{color:data.secondary_color}});
    }
    _showMessage(){
        if(!this.state.selectedDate || !this.state.selectedHour || !this.state.selectedSlotId)
            alert('Please select all inputs');
        else
            this.setState({message:'Your Slot Id is '+this.state.selectedSlotId+' \n Date : '+this.state.selectedDate});
    }
    _setSlotId(selectedSlotId){
        this.setState({selectedSlotId});
    }
    _returnStyle(){

    }
    _getHourSlots(slots){
        return this.state.hourSlots.map((slot)=>{
            let key=Object.keys(slot);
            let hand=key[0].split(":")[1];
            let styleObj=this.state.secondaryColorObj
            if(slot[key[0]]===this.state.selectedSlotId)
            {
                styleObj=this.state.selectionColorObj;
            } 
            return(<li style={styleObj}onClick={this._setDataForSlots.bind(this,slot[key[0]],'slot')}>
                {hand}
            </li>);
        });
    }
    _getHours(){
            if(!this.state.dateSlotsData.length)
                return <span style={{color:'red'}}>No slots available on this day</span>
            return this.state.dateSlotsData.map((slot)=>{
                let styleObj=this.state.secondaryColorObj
                if(slot.hour===this.state.selectedHour){
                    styleObj=this.state.selectionColorObj
                } 
                return(
                    <li style={styleObj} onClick={this._setDataForSlots.bind(this,slot,'hour')}>
                        {slot.hour}
                    </li>
                );
            });
        }
    _setDataForSlots(data,identifier){
        console.log("sdssdfsdf",data);
        switch(identifier){
            case "date": this.setState({dateSlotsData:data.date_slots,selectedDate:data.date,hourSlots:[],selectedSlotId:null,selectedHour:null});break;
            case "hour": this.setState({selectedHour:data.hour,hourSlots:data.hour_slots,selectedSlotId:null,});break;
            case "slot": this.setState({selectedSlotId:data});break;
        }
    }
    _getDates(){        
        return this.state.availableSlots.map((slot)=>{
            let styleObj=this.state.secondaryColorObj
            if(slot.date===this.state.selectedDate){
                styleObj=this.state.selectionColorObj
            }
            return( 
                <li className={(slot.date_slots.length?'':' lineThrough')} style={styleObj} onClick={this._setDataForSlots.bind(this,slot,'date')}>
                    {slot.date}
                </li>
            );
        });
    }
    render(){
        console.log(this.state);
        let {isApiFetched}=this.state;
        return(
            (isApiFetched?
            <React.Fragment>
            <ul>
                <div>{this._getDates()}</div>
                <div>{this.state.selectedDate?this._getHours():'Please select a date'}</div>
                <div>{this.state.selectedHour?this._getHourSlots():''}</div>
            </ul>
            <br/>
            <button onClick={this._showMessage}>Confirm</button><br/><br/>
            {this.state.message}
            </React.Fragment>
            :'Loading...')
        );
    }

}