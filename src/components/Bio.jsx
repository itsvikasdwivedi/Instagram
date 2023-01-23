import getPhotoUrl from 'get-photo-url'
import { useEffect, useState } from 'react'
import profileIcon from '../assets/profileIcon.svg'
import { db } from '../dexie'
import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, Modal, ModalCloseButton, ModalContent, ModalOverlay, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import { MdVerified } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs'

const Bio = () => {
  const [userDetails, setUserDetails] = useState({
    name: 'dev-vikas',
    about: 'Practice Makes Improvement',
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(profileIcon);

  useEffect(() => {
    const setDataFromDb = async () => {
      const userDetailsFromDb = await db.bio.get('info')
      const profilePhotoFromDb = await db.bio.get('profilePhoto')
      userDetailsFromDb && setUserDetails(userDetailsFromDb)
      profilePhotoFromDb && setProfilePhoto(profilePhotoFromDb)
    }
    setDataFromDb()
  }, [])

  const updateUserDetails = async (event) => {

    event.preventDefault()
    const objectData = {
      name: event.target.nameOfUser.value,
      about: event.target.aboutUser.value,
    }

    setUserDetails(objectData)
    await db.bio.put(objectData, 'info')
    setEditFormIsOpen(false)
  }

  const updateProfilePhoto = async () => {
    const newProfilePhoto = await getPhotoUrl('#profilePhotoInput')
    setProfilePhoto(newProfilePhoto)
    await db.bio.put(newProfilePhoto, 'profilePhoto')
  }

  const editForm = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Box onClick={() => setEditFormIsOpen(false)}>
        <ModalCloseButton/>
        </Box>
        <Box margin={'auto'} paddingTop={'20px'}>
          <FormControl className='edit-bio-form' onSubmit={(e) => updateUserDetails(e)} isRequired>
            <FormLabel>Edit Your Username</FormLabel>
            <Input type="text" name="nameOfUser" defaultValue={userDetails?.name} placeholder="Your name" variant='filled' required />
            <br />
            <br />
            <FormLabel>Edit Your Bio</FormLabel>
            <Input type="text" name="aboutUser" defaultValue={userDetails?.about} placeholder="About you" variant='filled' required />
            <br />
            <HStack spacing='24px' padding={'15'} marginTop={'10'}>
              <Button type="button" colorScheme='messenger' onClick={() => setEditFormIsOpen(false)}>Cancel</Button>
              <Button type="submit" colorScheme='messenger'>Save</Button>
            </HStack>
          </FormControl>

        </Box>
      </ModalContent>
    </Modal>
  )

  return (
    <section className="bio">
      <input type="file" accept="image/*" name="photo" id="profilePhotoInput" />
      <label htmlFor="profilePhotoInput" onClick={updateProfilePhoto}>
        <div className="profile-photo" role="button" title="Click to edit photo">
          <img src={profilePhoto} alt="profile" />
        </div>
      </label>

      <Box className="profile-info">
        <HStack spacing='20px'>

          <Flex alignItems={'center'}>
            <Box>
              <Text fontSize='xl'>{userDetails?.name}
              </Text>
            </Box>
            <Spacer />
            <Box>
              <MdVerified color='#0095f6' />
            </Box>
          </Flex>

          <Button size='sm'>
            Follow
          </Button>

          <Button size='sm' colorScheme='gray'>Message</Button>
          {editFormIsOpen ? editForm :
            <Button size='xs'
              colorScheme={'black'}
              fontSize={'m'}
              fontWeight={600}
              variant={'link'}
              onClick={() => {setEditFormIsOpen(true); onOpen(); }}>

              <BsThreeDots />

            </Button>
          }

        </HStack>

        <br />
        <HStack spacing={'26px'}>
          <Button
            colorScheme={'black'}
            fontSize={'m'}
            fontWeight={600}
            variant={'link'}
            _hover={{
              color: 'grey',
            }}
          >
            50 posts
          </Button>
          <Button
            colorScheme={'black'}
            fontSize={'m'}
            fontWeight={600}
            variant={'link'}
            _hover={{
              color: 'grey',
            }}
          >
            773 followers
          </Button>
          <Button
            colorScheme={'black'}
            fontSize={'m'}
            fontWeight={600}
            variant={'link'}
            _hover={{
              color: 'grey',
            }}
          >
            273 following
          </Button>


        </HStack>


        <Box mt={'20'}>
          <Text>{userDetails?.about}</Text>
        </Box>

      </Box>
    </section>
  )
}

export default Bio
