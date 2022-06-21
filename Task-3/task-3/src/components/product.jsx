import axios from 'axios';
import { useState, useEffect } from 'react';
import './product.css'
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Image,
    Badge,
    Input,
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import { useToast, Button } from '@chakra-ui/react';

import { add } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';





export const Product = () => {

    const [bag,setBag] = useState([])
    const toast = useToast()
    const navigate = useNavigate()
    const property = {
        beds: 3,
        baths: 2,
        reviewCount: 34,
        rating: 4,
    }
    const [products, setProducts] = useState([]);
    
    let dispatch = useDispatch();
    let reduxData = useSelector(state => state.bag);

    const handleClick = async () => {
        console.log(bag)
 
        // console.log("We are on Product detail")
    }   

    


    useEffect(() => {

        axios.get("https://login-signup-prod.herokuapp.com/products").then(res => {
            setProducts(res.data);
            setLoading(false);
            console.log(res.data)
            dispatch(add(res.data));
        }).catch(err => {
            console.log(err);
        }
        )
    }, []);

    useEffect(() => {
        console.log(reduxData)
    }
        , [reduxData])
        




    return <>
        <div className="product">
                                                                                                 

            <div className="product-container" >
                {products.map(product => {
                    return <div key={product.id}>

                        <Box maxW='sm' borderWidth='4px' borderRadius='1g' overflow='hidden' onClick = {()=>{
                            handleClick(product)
                            localStorage.setItem('bag', JSON.stringify(product))
                            navigate(`/product_details/${product.title}`)
                        }}>
                            <Image src={product.image} alt="product" width="600px" height="400px" />

                            <Box p='6'>
                                <Box display='flex' alignItems='baseline'>
                                    <Badge borderRadius='full' px='2' colorScheme='teal'>
                                        New
                                    </Badge>
                                    <Box
                                        color='gray.500'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='xs'
                                        textTransform='uppercase'
                                        ml='2'
                                    >
                                        {property.beds} beds &bull; {property.baths} baths
                                    </Box>
                                </Box>

                                <Box
                                    mt='1'
                                    fontWeight='semibold'
                                    as='h4'
                                    lineHeight='tight'
                                    noOfLines={1}
                                >
                                    {product.title}
                                </Box>

                                <Box>
                                    {product.price}
                                    <Box as='span' color='gray.600' fontSize='sm'>
                                        / wk
                                    </Box>
                                </Box>

                                <Box display='flex' mt='2' alignItems='center'>
                                    {Array(5)
                                        .fill('')
                                        .map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                color={i < property.rating ? 'teal.500' : 'gray.300'}
                                            />
                                        ))}
                                    <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                        {property.reviewCount} reviews
                                    </Box>
                                </Box>
                                <br></br>
                                <Input placeholder='Add Reviews' /><span><Button
                                    style={{ backgroundColor: "green", color: "white" }}
                                    onClick={() =>
                                        toast({
                                            title: 'Added review',
                                            description: "We've added your review.",
                                            status: 'success',
                                            duration: 9000,
                                            isClosable: true,
                                        })
                                    }
                                >
                                    Submit
                                </Button></span>
                            </Box>
                        </Box>

                    </div>
                }
                )}
            </div>



        </div>



    </>
}