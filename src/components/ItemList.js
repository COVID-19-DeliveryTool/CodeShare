import React from 'react'
import { Plus, CheckSquare, Square, Trash2 } from 'react-feather'
import {itemList} from '../data/orders.js'

export default function ItemList(props){
    const {formData, stepTwoIsValid, setFormData, validateStep2} = props

    return (
        <div style={{ marginTop: '2rem' }} className="col-10 mr-auto ml-auto">
            <form>
                <div className="form-row mr-auto ml-auto">
                    <div className="form-group col-xl-6 col-12 mr-auto ml-auto">
                        <ul className="list-group list-group-flush">
                            {itemList.map(item => {
                                var itemIndex = formData.items.findIndex(a => a.value === item.value)
                                if (formData.items && itemIndex > -1) {
                                    var itemsList = [...formData.items]
                                    itemsList.splice(itemIndex, 1)
                                    return <li key={item.id} onClick={() => setFormData({ ...formData, items: itemsList })} className="list-group-item underline-hover"><CheckSquare className="mr-3 brand" size={18} />{item.label}</li>
                                } else {
                                    return (
                                        <li key={item.id} onClick={() => setFormData({ ...formData, items: [...formData.items, item] })} className="underline-hover list-group-item d-flex"><Square className="mr-3 brand" size={18} />{item.label}</li>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-xl-6 col-12 mr-auto ml-auto">
                        {formData.freeTextItems.map((item, index) => {
                            return (
                                <div className="d-flex">
                                    <input maxLength="150" onChange={(e) => {
                                        var list = [...formData.freeTextItems]
                                        list[index] = e.target.value
                                        setFormData({...formData, freeTextItems: list})
                                    }} name='firstName' style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="name" className="form-control pl-3 pr-3" id="newListItem" placeholder="+ Add additional Item" value={item}>
                                    </input>
                                    <Trash2 onClick={() => {
                                        var list = [...formData.freeTextItems]
                                        if(list.length === 1) {
                                            list[index] = ''
                                        } else {
                                            list.splice(index,1)
                                        }
                                        setFormData({...formData, freeTextItems: list})
                                    }} style={{height:'100%'}} className="mt-2 hover brand"/>
                                </div>
                                
                            )
                        })}
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group col-xl-6 col-12 mr-auto ml-auto">
                        <button type="button" onClick={() => setFormData({...formData, freeTextItems: [...formData.freeTextItems, '']})} className="btn btn-sm btn-outline-brand"><Plus /> Add Another</button>
                    </div>
                </div>

                <div className="form-row mr-auto ml-auto text-center">
                    <button title={formData && (!formData.items || (formData.items && formData.items.length === 0)) ? 'Please select an item' : ''} onClick={() => validateStep2()} disabled={stepTwoIsValid()}  type="submit" className="btn text-center mr-auto ml-auto col-xl-6 col-12 mt-1 btn-primary-hover">Continue</button>
                </div>
            </form>
        </div>
    )
}