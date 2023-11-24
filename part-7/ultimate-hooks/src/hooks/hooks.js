import { useState, useEffect } from 'react'
import routeService from '../service/service'

export const useField = (type="text") => {
    const [value, setValue] = useState('')
  
    const onChange = (e) => {
      setValue(e.target.value)
    }
  
    const reset = () => {
      setValue('')
    }
    return {
      reset,   
      type,
      value,
      onChange,        
    }
  }
  
  export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
   
    useEffect(
      () => {routeService.getAll(baseUrl).then(data => setResources(data))},
    [baseUrl])
  
  
    const create = async (resource) => {
      const userDetails = JSON.parse(window.localStorage.getItem('userDetails'))
      const token = userDetails ? routeService.setToken(userDetails.userToken): null
      const response = routeService.create(baseUrl, resource, token)
      return response
    }
  
    const login = async (resource) => {    
      const response = routeService.create(baseUrl, resource)
      return response
    }
  
    const update = async (resource, id) => {
      const response = routeService.create(baseUrl, resource, id)
      return response
    }
  
    const service = {
      create,
      login,
      update,
      setResources
    }
  
    return [
      resources, service
    ]
  }

