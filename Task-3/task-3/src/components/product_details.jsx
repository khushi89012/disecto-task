import React from "react";
import { useEffect, useState } from "react";
import { Box, Badge, Image, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useToast, Button, Input } from "@chakra-ui/react";
import "./navbar.css";

import { addCount, addReview } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

export const Product_details = () => {
  const [review, setReview] = useState("");
  let [count, setCount] = useState(0);

  const toast = useToast();
  const [bag, setBag] = useState([]);

  const dispatch = useDispatch();
  const reduxData = useSelector(state => state.count);
  const reduxReview = useSelector(state => state.review);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bag"));
    setBag(data);
    console.log("Producr detail data", data);
  }, []);
  const property = {
    reviewCount: 34,
  };

  const handleReview = (e) => {
    setReview(e.target.value);
    setCount(count + 1);
    // console.log(e.target.value);
  };

  const handleClick = async () => {
    console.log(bag);
      toast({
        title: "Added review",
        description: "We've added your review.",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
      dispatch(addReview(review));
      dispatch(addCount(count));
      // navigate("/");
  }




  return (
    <>
      <div className="product-detail">
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={bag.image} alt={bag.price} />

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                New
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {bag.category} beds &bull; {bag.id}
              </Box>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {bag.title}
            </Box>

            <Box>
              {bag.price}
              <Box as="span" color="gray.600" fontSize="sm">
                rs
              </Box>
            </Box>
            <Text fontSize="xs">{bag.description}</Text>

            <Box display="flex" mt="2" alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < property.rating ? "teal.500" : "gray.300"}
                  />
                ))}
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {count} reviews
              </Box>
            </Box>
            <br></br>
            <Input placeholder="Add Reviews" onChange={handleReview} />
            <span>
              <Button
                style={{ backgroundColor: "green", color: "white" }}
                onClick={() =>
                  handleClick()
                }
              >
                Submit
              </Button>
            </span>
          </Box>
        </Box>
      </div>
    </>
  );
};
