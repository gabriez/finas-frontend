import React from 'react';
import ButtonAdd from '../Forms/ButtonAdd';

const Pagination = () => (

    <div className="flex 2xl:w-[1600px] w-[90vw]  justify-between border-t-2 mt-4 pt-3 border-[#5df153]">
    <ButtonAdd classNameCustom={" w-[122px] py-2"}>Anterior</ButtonAdd>
    <ButtonAdd classNameCustom={" w-[122px] py-2"}>Siguiente</ButtonAdd>
    </div>
    
);

export default Pagination