import getPhotoUrl from 'get-photo-url'
import { useEffect, useState } from 'react'
import profileIcon from '../assets/profileIcon.svg'
import { db } from '../dexie'
import { Box, Button,  Flex,  HStack, Spacer, Text } from '@chakra-ui/react'
import { MdVerified } from 'react-icons/md';
import{BsThreeDots} from 'react-icons/bs'
const Bio = () => {
  const [userDetails, setUserDetails] = useState({
    name: 'dev-vikas',
    about: 'Practice Makes Improvement',
  })

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
    <form className="edit-bio-form" onSubmit={(e) => updateUserDetails(e)}>
      <input type="text" id="" name="nameOfUser" defaultValue={userDetails?.name} placeholder="Your name" required />
      <input type="text" id="" name="aboutUser" defaultValue={userDetails?.about} placeholder="About you" required />
      <br />
      <button type="button" className="cancel-button Btn" onClick={() => setEditFormIsOpen(false)}>
        Cancel
      </button>
      <button type="submit" className='Btn'>Save</button>
    </form>
  )
  const editButton = <button className='Btn' onClick={() => setEditFormIsOpen(true)}>Edit</button>

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
          <Spacer/>
        <Box>
          <MdVerified color='#0095f6'/>
        </Box>
       </Flex>
    
        <Button size='sm'>
          Follow
        </Button>
        <Button size='sm' colorScheme='gray'>Message</Button>

        <BsThreeDots/>
        </HStack>
        

        <p className="about">{userDetails?.about}</p>

        {editFormIsOpen ? editForm : editButton}
      </Box>
    </section>
  )
}

export default Bio
