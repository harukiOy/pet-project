import React, { FC, useState, useMemo } from 'react';
import { COUNTRIES } from '../model/types/countries';

type Props = {
    defaultCountrie: COUNTRIES
    canEdit: boolean
    setCurrentCountry: (val: string) => void
}

const CountriesDropDown:FC<Props> = ({ canEdit, defaultCountrie, setCurrentCountry }) => (
    <select onChange={(e) => setCurrentCountry(e.currentTarget.value)} disabled={canEdit} defaultValue={defaultCountrie}>
        {
            Object.values(COUNTRIES).map((item) => <option key={item} value={item}>{item}</option>)
        }
    </select>

);

export default CountriesDropDown;