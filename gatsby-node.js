const path = require('path')
const workItems = require('./data/data.json')

// The convention is that type name must be title-cased.
const WORK_NODE_NAME = 'WorkItem'

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
    workItems.forEach((workItem) => {
        const {
            title,
            images,
        } = workItem

        const node = {
            id: createNodeId(`${WORK_NODE_NAME}>>>${title}`),
            title,
            images,
            internal: {
                type: WORK_NODE_NAME,
                contentDigest: createContentDigest(workItem),
            },
        }

        actions.createNode(node)
    })
}

exports.createSchemaCustomization = ({ store, actions, schema }) => {
    const { createTypes } = actions

    // location of the working directory
    const rootDir = store.getState().program.directory

    // type name Gatsby gives to workItem.images
    const IMAGE_NODE_NAME = WORK_NODE_NAME + 'Images'

    /**
     * Add a new field 'file' to WorkItemImages
     * 
     * You can also define the type in createSchemaCustomization
     * then add this resolve function in createResolvers
     * but I find it simpler to just do it here
     */
    const workImagesNode = schema.buildObjectType({
        name: IMAGE_NODE_NAME,
        fields: {
            file: {
                type: 'File!',
                resolve: (src, _, context) => {
                    // compose the absolute file path for image
                    const absoluteImagePath = path.join(rootDir, src.url)
                    return context.nodeModel
                        .getAllNodes({ type: 'File' })
                        .find(fileNode => {
                            const { absolutePath } = fileNode
                            return absoluteImagePath === absolutePath
                        })
                }
            }
        },
        extensions: {
            infer: true
        }
    })

    createTypes([workImagesNode])
}