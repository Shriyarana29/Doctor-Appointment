import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 year')
    const [fees, setFees] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [education, setEducation] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [about, setAbout] = useState('')

    const { backendUrl, adminToken } = useContext(AdminContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            if (!docImg) {
                return toast.error('Please upload a doctor image')
            }
            const formData = new FormData()
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('speciality', speciality)
            formData.append('education', education)
            formData.append('address', JSON.stringify({ address1, address2 }))
            formData.append('about', about)

            // Console log formdata
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`)
            })

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData,{headers: {Authorization: adminToken}})

            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setEmail('')    
                setPassword('')
                setExperience('1 year')
                setFees('')
                setSpeciality('General physician')
                setEducation('')
                setAddress1('')
                setAddress2('')
                setAbout('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Something went wrong')
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler} className='m-5 w-full'>
                <p className='mb-3 text-lg font-medium'>Add Doctor</p>
                <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                    <div className='flex items-center gap-4 mb-8 text-gray-500'>
                        <label htmlFor="doc-img">
                            <img className='w-16 bg-gray-100 rounded-full cursor-pointer'
                                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                        </label>
                        <input onChange={(e) => setDocImg(e.target.files[0])}
                            type='file' id='doc-img' hidden />
                        <p>Upload Doctor<br />picture</p>
                    </div>

                    <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                        <div className='w-full lg:flex-1 flex flex-col gap-4'>
                            <div className='flex-1 flex flex-col gap-1'>
                                <p>Doctor Name</p>
                                <input className='border rounded px-3 py-2'
                                    type='text' onChange={(e) => setName(e.target.value)} value={name} placeholder='Name' required />
                            </div>

                            <div className='flex-1 flex flex-col gap-1'>
                                <p>Doctor Email</p>
                                <input className='border rounded px-3 py-2'
                                    type='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' required />
                            </div>

                            <div className='flex-1 flex flex-col gap-1'>
                                <p>Doctor Password</p>
                                <input className='border rounded px-3 py-2'
                                    type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' required />
                            </div>

                            <div>
                                <p>Experience</p>
                                <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2'>
                                    <option value='1 year'>1 year</option>
                                    <option value='2 years'>2 years</option>
                                    <option value='3 years'>3 years</option>
                                    <option value='4 years'>4 years</option>
                                    <option value='5 years'>5 years</option>
                                    <option value='6 years'>6 years</option>
                                    <option value='7 years'>7 years</option>
                                    <option value='8 years'>8 years</option>
                                    <option value='9 years'>9 years</option>
                                    <option value='10 years'>10 years</option>
                                </select>
                            </div>

                            <div className='flex-1 flex flex-col gap-1'>
                                <p>Fees</p>
                                <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type='number' placeholder='Fees' required />
                            </div>
                        </div>

                        <div className='w-full lg:flex-1 flex flex-col gap-4'>
                            <div className='flex-1 flex flex-col gap-1'>
                                <p>Speciality</p>
                                <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2'>
                                    <option value='General physician'>General physician</option>
                                    <option value='Gynecologist'>Gynecologist</option>
                                    <option value='Dermatologist'>Dermatologist</option>
                                    <option value='Pediatricians'>Pediatricians</option>
                                    <option value='Neurologist'>Neurologist</option>
                                    <option value='Gastroenterologist'>Gastroenterologist</option>
                                </select>
                            </div>

                            <div className='flex-1 flex flex-col gap-1'>
                                <p>Education</p>
                                <input className='border rounded px-3 py-2'
                                    type='text' onChange={(e) => setEducation(e.target.value)} value={education} placeholder='Education' required />
                            </div>

                            <div className='flex-1 flex flex-col gap-1'>
                                <p>Address</p>
                                <input className='border rounded px-3 py-2' type='text' onChange={(e) => setAddress1(e.target.value)} value={address1} placeholder='Address 1' required />
                                <input className='border rounded px-3 py-2' type='text' onChange={(e) => setAddress2(e.target.value)} value={address2} placeholder='Address 2' required />
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className='mt-4 mb-2'>About Doctor</p>
                        <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded'
                            placeholder='About the Doctor' rows={5} required></textarea>
                    </div>

                    <button type='submit' className='bg-primary text-white px-10 py-3 mt-4 rounded-full'>Add Doctor</button>
                </div>
            </form>
        </div>
    )
}

export default AddDoctor