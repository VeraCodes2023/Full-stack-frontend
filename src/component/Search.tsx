import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface SearchInputProps{
    searchValue:string,
    setSearchValue:(value:string)=>void
  }
  

  const Search:React.FC<SearchInputProps> = (props) => {
    const {searchValue,setSearchValue}=props
  return (
    <Box id="search">
        <TextField
           color="warning"
            sx={{width:'400px', marginBottom:3,  margin:"auto",  }}
            label="Search" value={searchValue} onChange={e=>setSearchValue(e.target.value)}
        />
    </Box>
 
  )
}

export default Search