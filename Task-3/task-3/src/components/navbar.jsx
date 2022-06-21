
import { useState ,useEffect} from 'react';
import { useCallback } from 'react'
import './navbar.css'
import { Box,
    
    Tooltip,
    Input,
     Stack, 
     FormLabel, 
     InputGroup, 
     InputLeftAddon,
      InputRightAddon, Select, Textarea} from '@chakra-ui/react'
import { StarIcon, AddIcon ,SearchIcon,PhoneIcon } from '@chakra-ui/icons';

import { useToast, Button, useDisclosure } from '@chakra-ui/react'
import { useRef } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,

} from '@chakra-ui/react'
import axios from 'axios';


export const Navbar = ()=>{
   
    const { isOpen, onOpen, onClose } = useDisclosure()
    


    const [search,setSearch] = useState([])

    const debounce = (func) =>{
        let timer;

        return function (...args){
            const context = this;
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(()=>{
                timer = null;
                func.apply(context,args)
            },500)
        }
    }


   

    const handleChange = async (e)=>{

        let {value} = e.target
        let api = "jZK2Sfjwtplt4eYpWMVexI4RkgnPfdrFGQssO23QQ1s"
    let data = await   fetch(`https://demo.dataverse.org/api/search?q=${value}`)
    .then(res=> res.json())
    .then(json=>setSearch(json.data.items))
        console.log(data)
    }



const handleSubmit = (e)=>{
    e.preventDefault()
    setSearch("")
    console.log(search)
}
//usecallback provides us the memoization
const optimized = useCallback(debounce(handleChange),[])




    return (
        <>

<div class="topnav" id="myTopnav">
<ul>
  <li><a href="default.asp">Home</a></li>
  <li><a href="news.asp">News</a></li>
  <li><a href="contact.asp">Contact</a></li>
  <li><a href="/">Products</a></li>

<div className="navbar-div">
   
<form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input 
            
                    id="search" type="search"
                    placeholder="Search"
                     onChange = {optimized}
                         />
                   
                </div>
            </form>
      


   
   
   
   <div className="drawer">
   <Button leftIcon={<AddIcon />} colorScheme='purple' onClick={onOpen}>
                   Create user
               </Button>
               <Drawer
                   isOpen={isOpen}
                   placement='right'
   
                   onClose={onClose}
               >
                   <DrawerOverlay />
                   <DrawerContent>
                       <DrawerCloseButton />
                       <DrawerHeader borderBottomWidth='1px'>
                           Create a new account
                       </DrawerHeader>
   
                       <DrawerBody>
                           <Stack spacing='24px'>
                               <Box>
                                   <FormLabel htmlFor='username'>Name</FormLabel>
                                   <Input
   
                                       id='username'
                                       placeholder='Please enter user name'
                                   />
                               </Box>
   
                               <Box>
                                   <FormLabel htmlFor='url'>Url</FormLabel>
                                   <InputGroup>
                                       <InputLeftAddon>http://</InputLeftAddon>
                                       <Input
                                           type='url'
                                           id='url'
                                           placeholder='Please enter domain'
                                       />
                                       <InputRightAddon>.com</InputRightAddon>
                                   </InputGroup>
                               </Box>
   
                               <Box>
                                   <FormLabel htmlFor='owner'>Select Owner</FormLabel>
                                   <Select id='owner' defaultValue='segun'>
                                       <option value='segun'>Segun Adebayo</option>
                                       <option value='kola'>Kola Tioluwani</option>
                                   </Select>
                               </Box>
   
                               <Box>
                                   <FormLabel htmlFor='desc'>Description</FormLabel>
                                   <Textarea id='desc' />
                               </Box>
                           </Stack>
                       </DrawerBody>
   
                       <DrawerFooter borderTopWidth='1px'>
                           <Button variant='outline' mr={3} onClick={onClose}>
                               Cancel
                           </Button>
                           <Button colorScheme='blue'>Submit</Button>
                       </DrawerFooter>
                   </DrawerContent>
               </Drawer>
   </div>
   
   
   </div>

   </ul>

  {search?.length > 0 &&  
            <div className={"autocomplete"}>
                {search?.map((el,i)=>
                <div key = {i} className={"autocompleteItems"}>
                    <span>{el.name}</span>
                </div>
                
                )}
                
                </div>
                }



  
</div>
  
        
        </>
    )

}