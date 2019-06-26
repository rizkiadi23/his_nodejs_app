import {
  http
} from './HttpService'

class RequestDocumentService {
  
  /**
   * @params no params
   * calling the service to retrieve all document requests
   * will be updated to support pagination
   */
  static getRequestDocuments() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await http().get('api/v1/request_document/all')
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

  /**
   * @params documentType, metadata & requesterName
   * calling the service to create new document request
   */
  static createRequestDocument(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await http().post('api/v1/request_document/create', data)
        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default RequestDocumentService