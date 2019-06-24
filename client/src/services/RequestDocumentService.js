import axios from 'axios'

const url = 'api/v1/request_document/all'

class RequestDocumentService {
  
  /**
   * @params no params
   * calling the service to retrieve all document requests
   * will be updated to support pagination
   */
  static getRequestDocuments() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data_response = res.data.data
        resolve(
          data_response.map(reqDoc => ({
            ...reqDoc
          }))
        )
      } catch(err) {
        reject(err)
      }
    })
  }
}

export default RequestDocumentService