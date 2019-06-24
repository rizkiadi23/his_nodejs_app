const requestDocuments_controller = require('express').Router()
const {
  RequestDocument
} = require('../../../models')

/**
 * @params 
 * endpoint for admin to list all document requests
 */
requestDocuments_controller.get('/all', async (req, res) => {
  let users = await RequestDocument.findAll()

  try {
    res.json({
      success: true,
      data: users
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err })
  }
})

/**
 * @params document_id
 * endpoint to get document request details by id
 */
requestDocuments_controller.get('/:id', async (req, res) => {
  let doc_req = await RequestDocument.findAll({
    where: {
      id: req.params.id
    }
  });

  if (doc_req.length == 0) {
    res.status(404).json({
      success: false,
      message: 'Document request not found'
    })
  } else {
    res.json({
      success: true,
      data: doc_req[0]
    })
  }
})

/**
 * @params documentType and metadata
 * endpoint for creating new document request
 */
requestDocuments_controller.post('/create', async (req, res) => {
  const requester = "usertest"

  const new_req_payloads = {
    documentType: req.body.documentType,
    metadata: req.body.metadata,
    requesterName: requester,
  }

  try {
    const new_req_doc = await RequestDocument.findOrCreate({
      where: new_req_payloads
    })
    console.log(new_req_doc)
    new_req_doc[1] == true ? res.json({ success: true, data: 'Document Request Created'}) : res.status(500).json({ success: false, message: 'Internal Server Error' })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err
    })
  }
})

/**
 * @params document_id
 * endpoint to update document request
 */
requestDocuments_controller.patch('/:id/edit', async (req, res) => {
  const updated_doc_req = await RequestDocument.update(req.body, {
    where: {
      id: req.params.id
    }
  })

  updated_doc_req[0] > 0 ? res.json({success: true, message: 'document updated'}) : res.status(500).json({success: false, message: 'Internal Server Error'})
})

/**
 * @params id
 * endpoint to delete document request
 */
requestDocuments_controller.delete('/:id/delete', async (req, res) => {
  const deleted_doc_req = await RequestDocument.destroy({
    where: {
      id: req.params.id
    }
  })

  deleted_doc_req == 1 ? res.json({success:true, message: 'document request deleted'}) : res.json({success:false, message: 'user no longer exists'})
})

/**
 * @params document_id and status
 * endpoint for approval
 */
requestDocuments_controller.post('/:id/approval', async (req, res) => {
  const approval_status = req.body.status

  const updated_doc_req = await RequestDocument.update({status: approval_status}, {
    where: {
      id: req.params.id
    }
  })

  updated_doc_req[0] > 0 ? res.json({success: true, message: `document ${approval_status}`}) : res.status(500).json({success: false, message: 'Internal Server Error'})
})

module.exports = requestDocuments_controller