import { Box, Image, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";


export default function Content() {
    const [content, setContent] = React.useState(null);
    console.log(content);

    async function getUser() {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=50');
            console.log(response);
            setContent(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    console.log(content);
    if (!content) return "No post!"

    return (
        <Box pl={'80px'} pr={'80px'}>
            <Tabs variant='unstyled' alignContent={'center'}>
                <Box display={'flex'} justifyContent={'center'} >
                    <TabList marginTop={'-30px'} >
                        <Tab _selected={{ color: 'black', borderTop: '2px solid grey', borderRadius: 'none' }}>POSTS</Tab>
                        <Tab _selected={{ color: 'black', borderTop: '2px solid grey', borderRadius: 'none' }}>REELS</Tab>
                        <Tab _selected={{ color: 'black', borderTop: '2px solid grey', borderRadius: 'none' }}>TAGGED</Tab>
                    </TabList>
                </Box>
                <TabPanels>
                    <TabPanel>
                        <SimpleGrid columns={[2, null, 3]} spacing='40px' >
                            {
                                content.map((data) => (
                                    <Box >
                                        <Image src={data.url}></Image>
                                    </Box>
                                ))
                            }
                        </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                        <SimpleGrid columns={[2, null, 3]} spacing='40px' >
                            {
                                content.map((data) => (
                                    <Box >
                                        <Image src={data.url}></Image>
                                    </Box>
                                ))
                            }
                        </SimpleGrid>
                    </TabPanel>

                    <TabPanel>
                        <SimpleGrid columns={[2, null, 3]} spacing='40px' >
                            {
                                content.map((data) => (
                                    <Box >
                                        <Image src={data.url}></Image>
                                    </Box>
                                ))
                            }
                        </SimpleGrid>
                    </TabPanel>
                </TabPanels>
            </Tabs>


        </Box>
    );
}