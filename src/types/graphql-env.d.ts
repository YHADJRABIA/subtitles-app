/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never
  query: 'Query'
  mutation: never
  subscription: never
  types: {
    Boolean: unknown
    BooleanType: unknown
    CollectionMetadata: {
      kind: 'OBJECT'
      name: 'CollectionMetadata'
      fields: {
        count: {
          name: 'count'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
      }
    }
    ColorBucketType: {
      name: 'ColorBucketType'
      enumValues:
        | 'red'
        | 'orange'
        | 'pink'
        | 'cyan'
        | 'purple'
        | 'blue'
        | 'yellow'
        | 'green'
        | 'brown'
        | 'grey'
        | 'white'
        | 'black'
    }
    ColorField: {
      kind: 'OBJECT'
      name: 'ColorField'
      fields: {
        alpha: {
          name: 'alpha'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
        blue: {
          name: 'blue'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
        cssRgb: {
          name: 'cssRgb'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        green: {
          name: 'green'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
        hex: {
          name: 'hex'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        red: {
          name: 'red'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
      }
    }
    CustomData: unknown
    DateTime: unknown
    FaviconType: {
      name: 'FaviconType'
      enumValues: 'icon' | 'appleTouchIcon' | 'msApplication'
    }
    FileField: {
      kind: 'OBJECT'
      name: 'FileField'
      fields: {
        _createdAt: {
          name: '_createdAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        _editingUrl: {
          name: '_editingUrl'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        _updatedAt: {
          name: '_updatedAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        alt: {
          name: 'alt'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        author: {
          name: 'author'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        basename: {
          name: 'basename'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        blurUpThumb: {
          name: 'blurUpThumb'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        blurhash: {
          name: 'blurhash'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        colors: {
          name: 'colors'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'OBJECT'; name: 'ColorField'; ofType: null }
              }
            }
          }
        }
        copyright: {
          name: 'copyright'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        customData: {
          name: 'customData'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'CustomData'; ofType: null }
          }
        }
        exifInfo: {
          name: 'exifInfo'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'CustomData'; ofType: null }
          }
        }
        filename: {
          name: 'filename'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        focalPoint: {
          name: 'focalPoint'
          type: { kind: 'OBJECT'; name: 'focalPoint'; ofType: null }
        }
        format: {
          name: 'format'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        height: {
          name: 'height'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
        }
        id: {
          name: 'id'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'UploadId'; ofType: null }
          }
        }
        md5: {
          name: 'md5'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        mimeType: {
          name: 'mimeType'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        notes: {
          name: 'notes'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        responsiveImage: {
          name: 'responsiveImage'
          type: { kind: 'OBJECT'; name: 'ResponsiveImage'; ofType: null }
        }
        size: {
          name: 'size'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
        smartTags: {
          name: 'smartTags'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
              }
            }
          }
        }
        tags: {
          name: 'tags'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
              }
            }
          }
        }
        thumbhash: {
          name: 'thumbhash'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        title: {
          name: 'title'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        url: {
          name: 'url'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        video: {
          name: 'video'
          type: { kind: 'OBJECT'; name: 'UploadVideoField'; ofType: null }
        }
        width: {
          name: 'width'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
        }
      }
    }
    FileFieldInterface: {
      kind: 'INTERFACE'
      name: 'FileFieldInterface'
      fields: {
        _createdAt: {
          name: '_createdAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        _editingUrl: {
          name: '_editingUrl'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        _updatedAt: {
          name: '_updatedAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        alt: {
          name: 'alt'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        author: {
          name: 'author'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        basename: {
          name: 'basename'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        blurUpThumb: {
          name: 'blurUpThumb'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        blurhash: {
          name: 'blurhash'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        colors: {
          name: 'colors'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'OBJECT'; name: 'ColorField'; ofType: null }
              }
            }
          }
        }
        copyright: {
          name: 'copyright'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        customData: {
          name: 'customData'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'CustomData'; ofType: null }
          }
        }
        exifInfo: {
          name: 'exifInfo'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'CustomData'; ofType: null }
          }
        }
        filename: {
          name: 'filename'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        focalPoint: {
          name: 'focalPoint'
          type: { kind: 'OBJECT'; name: 'focalPoint'; ofType: null }
        }
        format: {
          name: 'format'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        height: {
          name: 'height'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
        }
        id: {
          name: 'id'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'UploadId'; ofType: null }
          }
        }
        md5: {
          name: 'md5'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        mimeType: {
          name: 'mimeType'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        notes: {
          name: 'notes'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        responsiveImage: {
          name: 'responsiveImage'
          type: { kind: 'OBJECT'; name: 'ResponsiveImage'; ofType: null }
        }
        size: {
          name: 'size'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
        smartTags: {
          name: 'smartTags'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
              }
            }
          }
        }
        tags: {
          name: 'tags'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
              }
            }
          }
        }
        thumbhash: {
          name: 'thumbhash'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        title: {
          name: 'title'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        url: {
          name: 'url'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        video: {
          name: 'video'
          type: { kind: 'OBJECT'; name: 'UploadVideoField'; ofType: null }
        }
        width: {
          name: 'width'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
        }
      }
      possibleTypes: 'FileField' | 'ImageFileField' | 'VideoFileField'
    }
    Float: unknown
    FloatType: unknown
    GlobalSeoField: {
      kind: 'OBJECT'
      name: 'GlobalSeoField'
      fields: {
        facebookPageUrl: {
          name: 'facebookPageUrl'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        fallbackSeo: {
          name: 'fallbackSeo'
          type: { kind: 'OBJECT'; name: 'SeoField'; ofType: null }
        }
        siteName: {
          name: 'siteName'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        titleSuffix: {
          name: 'titleSuffix'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        twitterAccount: {
          name: 'twitterAccount'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
    }
    ImageBlockRecord: {
      kind: 'OBJECT'
      name: 'ImageBlockRecord'
      fields: {
        _createdAt: {
          name: '_createdAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        _editingUrl: {
          name: '_editingUrl'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        _firstPublishedAt: {
          name: '_firstPublishedAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _isValid: {
          name: '_isValid'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          }
        }
        _modelApiKey: {
          name: '_modelApiKey'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        _publicationScheduledAt: {
          name: '_publicationScheduledAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _publishedAt: {
          name: '_publishedAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _seoMetaTags: {
          name: '_seoMetaTags'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'OBJECT'; name: 'Tag'; ofType: null }
              }
            }
          }
        }
        _status: {
          name: '_status'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'ENUM'; name: 'ItemStatus'; ofType: null }
          }
        }
        _unpublishingScheduledAt: {
          name: '_unpublishingScheduledAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _updatedAt: {
          name: '_updatedAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        asset: {
          name: 'asset'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'ImageFileField'; ofType: null }
          }
        }
        id: {
          name: 'id'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'ItemId'; ofType: null }
          }
        }
      }
    }
    ImageFileField: {
      kind: 'OBJECT'
      name: 'ImageFileField'
      fields: {
        _createdAt: {
          name: '_createdAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        _editingUrl: {
          name: '_editingUrl'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        _updatedAt: {
          name: '_updatedAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        alt: {
          name: 'alt'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        author: {
          name: 'author'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        basename: {
          name: 'basename'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        blurUpThumb: {
          name: 'blurUpThumb'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        blurhash: {
          name: 'blurhash'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        colors: {
          name: 'colors'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'OBJECT'; name: 'ColorField'; ofType: null }
              }
            }
          }
        }
        copyright: {
          name: 'copyright'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        customData: {
          name: 'customData'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'CustomData'; ofType: null }
          }
        }
        exifInfo: {
          name: 'exifInfo'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'CustomData'; ofType: null }
          }
        }
        filename: {
          name: 'filename'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        focalPoint: {
          name: 'focalPoint'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'focalPoint'; ofType: null }
          }
        }
        format: {
          name: 'format'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        height: {
          name: 'height'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
        id: {
          name: 'id'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'UploadId'; ofType: null }
          }
        }
        md5: {
          name: 'md5'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        mimeType: {
          name: 'mimeType'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        notes: {
          name: 'notes'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        responsiveImage: {
          name: 'responsiveImage'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'ResponsiveImage'; ofType: null }
          }
        }
        size: {
          name: 'size'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
        smartTags: {
          name: 'smartTags'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
              }
            }
          }
        }
        tags: {
          name: 'tags'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
              }
            }
          }
        }
        thumbhash: {
          name: 'thumbhash'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        title: {
          name: 'title'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        url: {
          name: 'url'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        video: {
          name: 'video'
          type: { kind: 'OBJECT'; name: 'UploadVideoField'; ofType: null }
        }
        width: {
          name: 'width'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
      }
    }
    ImageGalleryBlockRecord: {
      kind: 'OBJECT'
      name: 'ImageGalleryBlockRecord'
      fields: {
        _createdAt: {
          name: '_createdAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        _editingUrl: {
          name: '_editingUrl'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        _firstPublishedAt: {
          name: '_firstPublishedAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _isValid: {
          name: '_isValid'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          }
        }
        _modelApiKey: {
          name: '_modelApiKey'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        _publicationScheduledAt: {
          name: '_publicationScheduledAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _publishedAt: {
          name: '_publishedAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _seoMetaTags: {
          name: '_seoMetaTags'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'OBJECT'; name: 'Tag'; ofType: null }
              }
            }
          }
        }
        _status: {
          name: '_status'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'ENUM'; name: 'ItemStatus'; ofType: null }
          }
        }
        _unpublishingScheduledAt: {
          name: '_unpublishingScheduledAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _updatedAt: {
          name: '_updatedAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        assets: {
          name: 'assets'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'OBJECT'; name: 'ImageFileField'; ofType: null }
              }
            }
          }
        }
        id: {
          name: 'id'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'ItemId'; ofType: null }
          }
        }
      }
    }
    ImgixParams: {
      kind: 'INPUT_OBJECT'
      name: 'ImgixParams'
      isOneOf: false
      inputFields: [
        {
          name: 'ar'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'auto'
          type: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'ENUM'; name: 'ImgixParamsAuto'; ofType: null }
            }
          }
          defaultValue: null
        },
        {
          name: 'bgRemoveFallback'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'bgRemove'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'bgReplaceFallback'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'bgReplaceNegPrompt'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'bgReplace'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'bg'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'blendAlign'
          type: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: {
                kind: 'ENUM'
                name: 'ImgixParamsBlendAlign'
                ofType: null
              }
            }
          }
          defaultValue: null
        },
        {
          name: 'blendAlpha'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'blendColor'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'blendCrop'
          type: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: {
                kind: 'ENUM'
                name: 'ImgixParamsBlendCrop'
                ofType: null
              }
            }
          }
          defaultValue: null
        },
        {
          name: 'blendFit'
          type: { kind: 'ENUM'; name: 'ImgixParamsBlendFit'; ofType: null }
          defaultValue: null
        },
        {
          name: 'blendH'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'blendMode'
          type: { kind: 'ENUM'; name: 'ImgixParamsBlendMode'; ofType: null }
          defaultValue: null
        },
        {
          name: 'blendPad'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'blendSize'
          type: { kind: 'ENUM'; name: 'ImgixParamsBlendSize'; ofType: null }
          defaultValue: null
        },
        {
          name: 'blendW'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'blendX'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'blendY'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'blend'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'blur'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'borderBottom'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'borderLeft'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'borderRadiusInner'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'borderRadius'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'borderRight'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'borderTop'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'border'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'bri'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'ch'
          type: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'ENUM'; name: 'ImgixParamsCh'; ofType: null }
            }
          }
          defaultValue: null
        },
        {
          name: 'chromasub'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'colorquant'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'colors'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'con'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'cornerRadius'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'crop'
          type: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'ENUM'; name: 'ImgixParamsCrop'; ofType: null }
            }
          }
          defaultValue: null
        },
        {
          name: 'cs'
          type: { kind: 'ENUM'; name: 'ImgixParamsCs'; ofType: null }
          defaultValue: null
        },
        {
          name: 'dl'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'dpi'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'dpr'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'duotoneAlpha'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'duotone'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'exp'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'expires'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'faceindex'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'facepad'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'faces'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fillColor'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fillGenFallback'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fillGenNegPrompt'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fillGenPos'
          type: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: {
                kind: 'ENUM'
                name: 'ImgixParamsFillGenPos'
                ofType: null
              }
            }
          }
          defaultValue: null
        },
        {
          name: 'fillGenPrompt'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fillGenSeed'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fillGradientCs'
          type: {
            kind: 'ENUM'
            name: 'ImgixParamsFillGradientCs'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'fillGradientLinearDirection'
          type: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: {
                kind: 'ENUM'
                name: 'ImgixParamsFillGradientLinearDirection'
                ofType: null
              }
            }
          }
          defaultValue: null
        },
        {
          name: 'fillGradientLinear'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fillGradientRadialRadius'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fillGradientRadialX'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fillGradientRadialY'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fillGradientRadial'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fillGradientType'
          type: {
            kind: 'ENUM'
            name: 'ImgixParamsFillGradientType'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'fill'
          type: { kind: 'ENUM'; name: 'ImgixParamsFill'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fit'
          type: { kind: 'ENUM'; name: 'ImgixParamsFit'; ofType: null }
          defaultValue: null
        },
        {
          name: 'flip'
          type: { kind: 'ENUM'; name: 'ImgixParamsFlip'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fm'
          type: { kind: 'ENUM'; name: 'ImgixParamsFm'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fpDebug'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fpX'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fpY'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fpZ'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'fps'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'frame'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'gam'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'gifQ'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'gridColors'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'gridSize'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'h'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'high'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'htn'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'hue'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'interval'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'invert'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'iptc'
          type: { kind: 'ENUM'; name: 'ImgixParamsIptc'; ofType: null }
          defaultValue: null
        },
        {
          name: 'jpgProgressive'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'loop'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'lossless'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'markAlign'
          type: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: {
                kind: 'ENUM'
                name: 'ImgixParamsMarkAlign'
                ofType: null
              }
            }
          }
          defaultValue: null
        },
        {
          name: 'markAlpha'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'markBase'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'markFit'
          type: { kind: 'ENUM'; name: 'ImgixParamsMarkFit'; ofType: null }
          defaultValue: null
        },
        {
          name: 'markH'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'markPad'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'markRot'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'markScale'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'markTile'
          type: { kind: 'ENUM'; name: 'ImgixParamsMarkTile'; ofType: null }
          defaultValue: null
        },
        {
          name: 'markW'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'markX'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'markY'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'mark'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'maskBg'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'mask'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'maxH'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'maxW'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'minH'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'minW'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'monochrome'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'nr'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'nrs'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'orient'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'padBottom'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'padLeft'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'padRight'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'padTop'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'pad'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'page'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'palette'
          type: { kind: 'ENUM'; name: 'ImgixParamsPalette'; ofType: null }
          defaultValue: null
        },
        {
          name: 'pdfAnnotation'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'prefix'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'px'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'q'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'rect'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'reverse'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'rot'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'sat'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'sepia'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'shad'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'sharp'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'skip'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'svgSanitize'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'transparency'
          type: { kind: 'ENUM'; name: 'ImgixParamsTransparency'; ofType: null }
          defaultValue: null
        },
        {
          name: 'trimColor'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'trimMd'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'trimPad'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'trimSd'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'trimTol'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'trim'
          type: { kind: 'ENUM'; name: 'ImgixParamsTrim'; ofType: null }
          defaultValue: null
        },
        {
          name: 'txtAlign'
          type: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: {
                kind: 'ENUM'
                name: 'ImgixParamsTxtAlign'
                ofType: null
              }
            }
          }
          defaultValue: null
        },
        {
          name: 'txtClip'
          type: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'ENUM'; name: 'ImgixParamsTxtClip'; ofType: null }
            }
          }
          defaultValue: null
        },
        {
          name: 'txtColor'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'txtFit'
          type: { kind: 'ENUM'; name: 'ImgixParamsTxtFit'; ofType: null }
          defaultValue: null
        },
        {
          name: 'txtFont'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'txtLead'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'txtLineColor'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'txtLine'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'txtPad'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'txtShad'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'txtSize'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'txtTrack'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'txtWidth'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'txtX'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'txtY'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'txt'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'upscaleFallback'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'upscale'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'usm'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'usmrad'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'vib'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'w'
          type: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'skipDefaultOptimizations'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
      ]
    }
    ImgixParamsAuto: {
      name: 'ImgixParamsAuto'
      enumValues: 'enhance' | 'format' | 'redeye' | 'compress'
    }
    ImgixParamsBlendAlign: {
      name: 'ImgixParamsBlendAlign'
      enumValues: 'top' | 'bottom' | 'middle' | 'left' | 'right' | 'center'
    }
    ImgixParamsBlendCrop: {
      name: 'ImgixParamsBlendCrop'
      enumValues: 'top' | 'bottom' | 'left' | 'right' | 'faces'
    }
    ImgixParamsBlendFit: {
      name: 'ImgixParamsBlendFit'
      enumValues: 'clamp' | 'clip' | 'crop' | 'scale' | 'max'
    }
    ImgixParamsBlendMode: {
      name: 'ImgixParamsBlendMode'
      enumValues:
        | 'color'
        | 'burn'
        | 'dodge'
        | 'darken'
        | 'difference'
        | 'exclusion'
        | 'hardlight'
        | 'hue'
        | 'lighten'
        | 'luminosity'
        | 'multiply'
        | 'overlay'
        | 'saturation'
        | 'screen'
        | 'softlight'
        | 'normal'
    }
    ImgixParamsBlendSize: {
      name: 'ImgixParamsBlendSize'
      enumValues: 'inherit'
    }
    ImgixParamsCh: {
      name: 'ImgixParamsCh'
      enumValues: 'width' | 'dpr' | 'saveData'
    }
    ImgixParamsCrop: {
      name: 'ImgixParamsCrop'
      enumValues:
        | 'top'
        | 'bottom'
        | 'left'
        | 'right'
        | 'faces'
        | 'entropy'
        | 'edges'
        | 'focalpoint'
    }
    ImgixParamsCs: {
      name: 'ImgixParamsCs'
      enumValues: 'srgb' | 'adobergb1998' | 'tinysrgb' | 'strip'
    }
    ImgixParamsFill: {
      name: 'ImgixParamsFill'
      enumValues: 'solid' | 'blur' | 'gen' | 'generative' | 'gradient'
    }
    ImgixParamsFillGenPos: {
      name: 'ImgixParamsFillGenPos'
      enumValues: 'top' | 'bottom' | 'middle' | 'left' | 'right' | 'center'
    }
    ImgixParamsFillGradientCs: {
      name: 'ImgixParamsFillGradientCs'
      enumValues: 'linear' | 'srgb' | 'oklab' | 'hsl' | 'lch'
    }
    ImgixParamsFillGradientLinearDirection: {
      name: 'ImgixParamsFillGradientLinearDirection'
      enumValues: 'top' | 'bottom' | 'left' | 'right'
    }
    ImgixParamsFillGradientType: {
      name: 'ImgixParamsFillGradientType'
      enumValues: 'linear' | 'radial'
    }
    ImgixParamsFit: {
      name: 'ImgixParamsFit'
      enumValues:
        | 'clamp'
        | 'clip'
        | 'crop'
        | 'facearea'
        | 'fill'
        | 'fillmax'
        | 'max'
        | 'min'
        | 'scale'
    }
    ImgixParamsFlip: { name: 'ImgixParamsFlip'; enumValues: 'h' | 'v' | 'hv' }
    ImgixParamsFm: {
      name: 'ImgixParamsFm'
      enumValues:
        | 'gif'
        | 'jpg'
        | 'jp2'
        | 'json'
        | 'jxr'
        | 'pjpg'
        | 'mp4'
        | 'png'
        | 'png8'
        | 'png32'
        | 'webp'
        | 'webm'
        | 'blurhash'
        | 'avif'
    }
    ImgixParamsIptc: { name: 'ImgixParamsIptc'; enumValues: 'allow' | 'block' }
    ImgixParamsMarkAlign: {
      name: 'ImgixParamsMarkAlign'
      enumValues: 'top' | 'middle' | 'bottom' | 'left' | 'center' | 'right'
    }
    ImgixParamsMarkFit: {
      name: 'ImgixParamsMarkFit'
      enumValues: 'clip' | 'crop' | 'fill' | 'max' | 'scale'
    }
    ImgixParamsMarkTile: { name: 'ImgixParamsMarkTile'; enumValues: 'grid' }
    ImgixParamsPalette: {
      name: 'ImgixParamsPalette'
      enumValues: 'css' | 'json'
    }
    ImgixParamsTransparency: {
      name: 'ImgixParamsTransparency'
      enumValues: 'grid'
    }
    ImgixParamsTrim: { name: 'ImgixParamsTrim'; enumValues: 'auto' | 'color' }
    ImgixParamsTxtAlign: {
      name: 'ImgixParamsTxtAlign'
      enumValues: 'top' | 'middle' | 'bottom' | 'left' | 'center' | 'right'
    }
    ImgixParamsTxtClip: {
      name: 'ImgixParamsTxtClip'
      enumValues: 'start' | 'middle' | 'end' | 'ellipsis'
    }
    ImgixParamsTxtFit: { name: 'ImgixParamsTxtFit'; enumValues: 'max' }
    InUseFilter: {
      kind: 'INPUT_OBJECT'
      name: 'InUseFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'eq'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
      ]
    }
    Int: unknown
    IntType: unknown
    ItemId: unknown
    ItemStatus: {
      name: 'ItemStatus'
      enumValues: 'draft' | 'updated' | 'published'
    }
    JsonField: unknown
    MetaTagAttributes: unknown
    MuxThumbnailFormatType: {
      name: 'MuxThumbnailFormatType'
      enumValues: 'jpg' | 'png' | 'gif'
    }
    OrientationFilter: {
      kind: 'INPUT_OBJECT'
      name: 'OrientationFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'eq'
          type: { kind: 'ENUM'; name: 'UploadOrientation'; ofType: null }
          defaultValue: null
        },
        {
          name: 'neq'
          type: { kind: 'ENUM'; name: 'UploadOrientation'; ofType: null }
          defaultValue: null
        },
      ]
    }
    PageModelStructuredTextBlocksField: {
      kind: 'UNION'
      name: 'PageModelStructuredTextBlocksField'
      fields: {}
      possibleTypes:
        | 'ImageBlockRecord'
        | 'ImageGalleryBlockRecord'
        | 'VideoBlockRecord'
    }
    PageModelStructuredTextField: {
      kind: 'OBJECT'
      name: 'PageModelStructuredTextField'
      fields: {
        blocks: {
          name: 'blocks'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: {
                  kind: 'UNION'
                  name: 'PageModelStructuredTextBlocksField'
                  ofType: null
                }
              }
            }
          }
        }
        links: {
          name: 'links'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'OBJECT'; name: 'PageRecord'; ofType: null }
              }
            }
          }
        }
        value: {
          name: 'value'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'JsonField'; ofType: null }
          }
        }
      }
    }
    PageRecord: {
      kind: 'OBJECT'
      name: 'PageRecord'
      fields: {
        _createdAt: {
          name: '_createdAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        _editingUrl: {
          name: '_editingUrl'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        _firstPublishedAt: {
          name: '_firstPublishedAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _isValid: {
          name: '_isValid'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          }
        }
        _modelApiKey: {
          name: '_modelApiKey'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        _publicationScheduledAt: {
          name: '_publicationScheduledAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _publishedAt: {
          name: '_publishedAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _seoMetaTags: {
          name: '_seoMetaTags'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'OBJECT'; name: 'Tag'; ofType: null }
              }
            }
          }
        }
        _status: {
          name: '_status'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'ENUM'; name: 'ItemStatus'; ofType: null }
          }
        }
        _unpublishingScheduledAt: {
          name: '_unpublishingScheduledAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _updatedAt: {
          name: '_updatedAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        id: {
          name: 'id'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'ItemId'; ofType: null }
          }
        }
        seoAnalysis: {
          name: 'seoAnalysis'
          type: { kind: 'SCALAR'; name: 'JsonField'; ofType: null }
        }
        seoSettingsSocial: {
          name: 'seoSettingsSocial'
          type: { kind: 'OBJECT'; name: 'SeoField'; ofType: null }
        }
        structuredText: {
          name: 'structuredText'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'OBJECT'
              name: 'PageModelStructuredTextField'
              ofType: null
            }
          }
        }
        title: {
          name: 'title'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
      }
    }
    Query: {
      kind: 'OBJECT'
      name: 'Query'
      fields: {
        _allUploadsMeta: {
          name: '_allUploadsMeta'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'CollectionMetadata'; ofType: null }
          }
        }
        _site: {
          name: '_site'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'Site'; ofType: null }
          }
        }
        allUploads: {
          name: 'allUploads'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'OBJECT'; name: 'FileField'; ofType: null }
              }
            }
          }
        }
        page: {
          name: 'page'
          type: { kind: 'OBJECT'; name: 'PageRecord'; ofType: null }
        }
        upload: {
          name: 'upload'
          type: { kind: 'OBJECT'; name: 'FileField'; ofType: null }
        }
      }
    }
    RecordInterface: {
      kind: 'INTERFACE'
      name: 'RecordInterface'
      fields: {
        _createdAt: {
          name: '_createdAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        _editingUrl: {
          name: '_editingUrl'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        _firstPublishedAt: {
          name: '_firstPublishedAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _isValid: {
          name: '_isValid'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          }
        }
        _modelApiKey: {
          name: '_modelApiKey'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        _publicationScheduledAt: {
          name: '_publicationScheduledAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _publishedAt: {
          name: '_publishedAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _seoMetaTags: {
          name: '_seoMetaTags'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'OBJECT'; name: 'Tag'; ofType: null }
              }
            }
          }
        }
        _status: {
          name: '_status'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'ENUM'; name: 'ItemStatus'; ofType: null }
          }
        }
        _unpublishingScheduledAt: {
          name: '_unpublishingScheduledAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _updatedAt: {
          name: '_updatedAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        id: {
          name: 'id'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'ItemId'; ofType: null }
          }
        }
      }
      possibleTypes:
        | 'ImageBlockRecord'
        | 'ImageGalleryBlockRecord'
        | 'PageRecord'
        | 'VideoBlockRecord'
    }
    ResolutionFilter: {
      kind: 'INPUT_OBJECT'
      name: 'ResolutionFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'eq'
          type: { kind: 'ENUM'; name: 'ResolutionType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'neq'
          type: { kind: 'ENUM'; name: 'ResolutionType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'in'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'ENUM'; name: 'ResolutionType'; ofType: null }
          }
          defaultValue: null
        },
        {
          name: 'notIn'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'ENUM'; name: 'ResolutionType'; ofType: null }
          }
          defaultValue: null
        },
      ]
    }
    ResolutionType: {
      name: 'ResolutionType'
      enumValues: 'icon' | 'small' | 'medium' | 'large'
    }
    ResponsiveImage: {
      kind: 'OBJECT'
      name: 'ResponsiveImage'
      fields: {
        alt: {
          name: 'alt'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        aspectRatio: {
          name: 'aspectRatio'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          }
        }
        base64: {
          name: 'base64'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        bgColor: {
          name: 'bgColor'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        height: {
          name: 'height'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
        sizes: {
          name: 'sizes'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        src: {
          name: 'src'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        srcSet: {
          name: 'srcSet'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        title: {
          name: 'title'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        webpSrcSet: {
          name: 'webpSrcSet'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        width: {
          name: 'width'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
      }
    }
    SeoField: {
      kind: 'OBJECT'
      name: 'SeoField'
      fields: {
        description: {
          name: 'description'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        image: {
          name: 'image'
          type: { kind: 'OBJECT'; name: 'FileField'; ofType: null }
        }
        noIndex: {
          name: 'noIndex'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
        }
        title: {
          name: 'title'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        twitterCard: {
          name: 'twitterCard'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
      }
    }
    Site: {
      kind: 'OBJECT'
      name: 'Site'
      fields: {
        favicon: {
          name: 'favicon'
          type: { kind: 'OBJECT'; name: 'FileField'; ofType: null }
        }
        faviconMetaTags: {
          name: 'faviconMetaTags'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'OBJECT'; name: 'Tag'; ofType: null }
              }
            }
          }
        }
        globalSeo: {
          name: 'globalSeo'
          type: { kind: 'OBJECT'; name: 'GlobalSeoField'; ofType: null }
        }
        locales: {
          name: 'locales'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'ENUM'; name: 'SiteLocale'; ofType: null }
              }
            }
          }
        }
        noIndex: {
          name: 'noIndex'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
        }
      }
    }
    SiteLocale: { name: 'SiteLocale'; enumValues: Locale }
    String: unknown
    StringMatchesFilter: {
      kind: 'INPUT_OBJECT'
      name: 'StringMatchesFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'pattern'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
          defaultValue: null
        },
        {
          name: 'caseSensitive'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: 'false'
        },
        {
          name: 'regexp'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: 'true'
        },
      ]
    }
    Tag: {
      kind: 'OBJECT'
      name: 'Tag'
      fields: {
        attributes: {
          name: 'attributes'
          type: { kind: 'SCALAR'; name: 'MetaTagAttributes'; ofType: null }
        }
        content: {
          name: 'content'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        tag: {
          name: 'tag'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
      }
    }
    TypeFilter: {
      kind: 'INPUT_OBJECT'
      name: 'TypeFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'eq'
          type: { kind: 'ENUM'; name: 'UploadType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'neq'
          type: { kind: 'ENUM'; name: 'UploadType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'in'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'ENUM'; name: 'UploadType'; ofType: null }
          }
          defaultValue: null
        },
        {
          name: 'notIn'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'ENUM'; name: 'UploadType'; ofType: null }
          }
          defaultValue: null
        },
      ]
    }
    UploadAltFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadAltFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'matches'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'StringMatchesFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'notMatches'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'StringMatchesFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'eq'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'neq'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'in'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
          defaultValue: null
        },
        {
          name: 'notIn'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
          defaultValue: null
        },
        {
          name: 'exists'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
      ]
    }
    UploadAuthorFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadAuthorFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'matches'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'StringMatchesFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'notMatches'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'StringMatchesFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'exists'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
      ]
    }
    UploadBasenameFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadBasenameFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'matches'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'StringMatchesFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'notMatches'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'StringMatchesFilter'
            ofType: null
          }
          defaultValue: null
        },
      ]
    }
    UploadColorsFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadColorsFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'contains'
          type: { kind: 'ENUM'; name: 'ColorBucketType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'allIn'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'ENUM'; name: 'ColorBucketType'; ofType: null }
          }
          defaultValue: null
        },
        {
          name: 'anyIn'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'ENUM'; name: 'ColorBucketType'; ofType: null }
          }
          defaultValue: null
        },
        {
          name: 'notIn'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'ENUM'; name: 'ColorBucketType'; ofType: null }
          }
          defaultValue: null
        },
        {
          name: 'eq'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'ENUM'; name: 'ColorBucketType'; ofType: null }
          }
          defaultValue: null
        },
      ]
    }
    UploadCopyrightFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadCopyrightFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'matches'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'StringMatchesFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'notMatches'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'StringMatchesFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'exists'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
      ]
    }
    UploadCreatedAtFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadCreatedAtFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'eq'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          defaultValue: null
        },
        {
          name: 'neq'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          defaultValue: null
        },
        {
          name: 'lt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          defaultValue: null
        },
        {
          name: 'lte'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          defaultValue: null
        },
        {
          name: 'gt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          defaultValue: null
        },
        {
          name: 'gte'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          defaultValue: null
        },
      ]
    }
    UploadFilenameFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadFilenameFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'matches'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'StringMatchesFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'notMatches'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'StringMatchesFilter'
            ofType: null
          }
          defaultValue: null
        },
      ]
    }
    UploadFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'type'
          type: { kind: 'INPUT_OBJECT'; name: 'TypeFilter'; ofType: null }
          defaultValue: null
        },
        {
          name: 'inUse'
          type: { kind: 'INPUT_OBJECT'; name: 'InUseFilter'; ofType: null }
          defaultValue: null
        },
        {
          name: 'resolution'
          type: { kind: 'INPUT_OBJECT'; name: 'ResolutionFilter'; ofType: null }
          defaultValue: null
        },
        {
          name: 'size'
          type: { kind: 'INPUT_OBJECT'; name: 'UploadSizeFilter'; ofType: null }
          defaultValue: null
        },
        {
          name: 'tags'
          type: { kind: 'INPUT_OBJECT'; name: 'UploadTagsFilter'; ofType: null }
          defaultValue: null
        },
        {
          name: 'smartTags'
          type: { kind: 'INPUT_OBJECT'; name: 'UploadTagsFilter'; ofType: null }
          defaultValue: null
        },
        {
          name: 'colors'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'UploadColorsFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'orientation'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'OrientationFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'id'
          type: { kind: 'INPUT_OBJECT'; name: 'UploadIdFilter'; ofType: null }
          defaultValue: null
        },
        {
          name: 'mimeType'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'UploadMimeTypeFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'format'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'UploadFormatFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'height'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'UploadHeightFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'width'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'UploadWidthFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'alt'
          type: { kind: 'INPUT_OBJECT'; name: 'UploadAltFilter'; ofType: null }
          defaultValue: null
        },
        {
          name: 'title'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'UploadTitleFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'notes'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'UploadNotesFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'md5'
          type: { kind: 'INPUT_OBJECT'; name: 'UploadMd5Filter'; ofType: null }
          defaultValue: null
        },
        {
          name: 'author'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'UploadAuthorFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'copyright'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'UploadCopyrightFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'basename'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'UploadBasenameFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'filename'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'UploadFilenameFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: '_createdAt'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'UploadCreatedAtFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: '_updatedAt'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'UploadUpdatedAtFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'OR'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'INPUT_OBJECT'; name: 'UploadFilter'; ofType: null }
          }
          defaultValue: null
        },
        {
          name: 'AND'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'INPUT_OBJECT'; name: 'UploadFilter'; ofType: null }
          }
          defaultValue: null
        },
      ]
    }
    UploadFormatFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadFormatFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'eq'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'neq'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'in'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
          defaultValue: null
        },
        {
          name: 'notIn'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
          defaultValue: null
        },
      ]
    }
    UploadHeightFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadHeightFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'gt'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'lt'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'gte'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'lte'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'eq'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'neq'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
      ]
    }
    UploadId: unknown
    UploadIdFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadIdFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'eq'
          type: { kind: 'SCALAR'; name: 'UploadId'; ofType: null }
          defaultValue: null
        },
        {
          name: 'neq'
          type: { kind: 'SCALAR'; name: 'UploadId'; ofType: null }
          defaultValue: null
        },
        {
          name: 'in'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'SCALAR'; name: 'UploadId'; ofType: null }
          }
          defaultValue: null
        },
        {
          name: 'notIn'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'SCALAR'; name: 'UploadId'; ofType: null }
          }
          defaultValue: null
        },
      ]
    }
    UploadMd5Filter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadMd5Filter'
      isOneOf: false
      inputFields: [
        {
          name: 'eq'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'neq'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'in'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
          defaultValue: null
        },
        {
          name: 'notIn'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
          defaultValue: null
        },
      ]
    }
    UploadMimeTypeFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadMimeTypeFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'matches'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'StringMatchesFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'notMatches'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'StringMatchesFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'eq'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'neq'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'in'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
          defaultValue: null
        },
        {
          name: 'notIn'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
          defaultValue: null
        },
      ]
    }
    UploadNotesFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadNotesFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'matches'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'StringMatchesFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'notMatches'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'StringMatchesFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'exists'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
      ]
    }
    UploadOrderBy: {
      name: 'UploadOrderBy'
      enumValues:
        | '_createdAt_ASC'
        | '_createdAt_DESC'
        | 'size_ASC'
        | 'size_DESC'
        | 'resolution_ASC'
        | 'resolution_DESC'
        | 'filename_ASC'
        | 'filename_DESC'
        | 'basename_ASC'
        | 'basename_DESC'
        | 'mimeType_ASC'
        | 'mimeType_DESC'
        | 'format_ASC'
        | 'format_DESC'
        | '_updatedAt_ASC'
        | '_updatedAt_DESC'
        | 'id_ASC'
        | 'id_DESC'
    }
    UploadOrientation: {
      name: 'UploadOrientation'
      enumValues: 'landscape' | 'portrait' | 'square'
    }
    UploadSizeFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadSizeFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'gt'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'lt'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'gte'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'lte'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'eq'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'neq'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
      ]
    }
    UploadTagsFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadTagsFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'contains'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'allIn'
          type: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
            }
          }
          defaultValue: null
        },
        {
          name: 'anyIn'
          type: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
            }
          }
          defaultValue: null
        },
        {
          name: 'notIn'
          type: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
            }
          }
          defaultValue: null
        },
        {
          name: 'eq'
          type: {
            kind: 'LIST'
            name: never
            ofType: {
              kind: 'NON_NULL'
              name: never
              ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
            }
          }
          defaultValue: null
        },
      ]
    }
    UploadTitleFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadTitleFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'matches'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'StringMatchesFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'notMatches'
          type: {
            kind: 'INPUT_OBJECT'
            name: 'StringMatchesFilter'
            ofType: null
          }
          defaultValue: null
        },
        {
          name: 'eq'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'neq'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
          defaultValue: null
        },
        {
          name: 'in'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
          defaultValue: null
        },
        {
          name: 'notIn'
          type: {
            kind: 'LIST'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
          defaultValue: null
        },
        {
          name: 'exists'
          type: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          defaultValue: null
        },
      ]
    }
    UploadType: {
      name: 'UploadType'
      enumValues:
        | 'image'
        | 'audio'
        | 'video'
        | 'richtext'
        | 'presentation'
        | 'spreadsheet'
        | 'pdfdocument'
        | 'archive'
    }
    UploadUpdatedAtFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadUpdatedAtFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'eq'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          defaultValue: null
        },
        {
          name: 'neq'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          defaultValue: null
        },
        {
          name: 'lt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          defaultValue: null
        },
        {
          name: 'lte'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          defaultValue: null
        },
        {
          name: 'gt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          defaultValue: null
        },
        {
          name: 'gte'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          defaultValue: null
        },
      ]
    }
    UploadVideoField: {
      kind: 'OBJECT'
      name: 'UploadVideoField'
      fields: {
        alt: {
          name: 'alt'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        blurUpThumb: {
          name: 'blurUpThumb'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        blurhash: {
          name: 'blurhash'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        duration: {
          name: 'duration'
          type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
        framerate: {
          name: 'framerate'
          type: { kind: 'SCALAR'; name: 'Int'; ofType: null }
        }
        height: {
          name: 'height'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
        mp4Url: {
          name: 'mp4Url'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        muxAssetId: {
          name: 'muxAssetId'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        muxPlaybackId: {
          name: 'muxPlaybackId'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        streamingUrl: {
          name: 'streamingUrl'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        thumbhash: {
          name: 'thumbhash'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        thumbnailUrl: {
          name: 'thumbnailUrl'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        title: {
          name: 'title'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        width: {
          name: 'width'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
      }
    }
    UploadWidthFilter: {
      kind: 'INPUT_OBJECT'
      name: 'UploadWidthFilter'
      isOneOf: false
      inputFields: [
        {
          name: 'gt'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'lt'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'gte'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'lte'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'eq'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
        {
          name: 'neq'
          type: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          defaultValue: null
        },
      ]
    }
    VideoBlockRecord: {
      kind: 'OBJECT'
      name: 'VideoBlockRecord'
      fields: {
        _createdAt: {
          name: '_createdAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        _editingUrl: {
          name: '_editingUrl'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        _firstPublishedAt: {
          name: '_firstPublishedAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _isValid: {
          name: '_isValid'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'BooleanType'; ofType: null }
          }
        }
        _modelApiKey: {
          name: '_modelApiKey'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        _publicationScheduledAt: {
          name: '_publicationScheduledAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _publishedAt: {
          name: '_publishedAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _seoMetaTags: {
          name: '_seoMetaTags'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'OBJECT'; name: 'Tag'; ofType: null }
              }
            }
          }
        }
        _status: {
          name: '_status'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'ENUM'; name: 'ItemStatus'; ofType: null }
          }
        }
        _unpublishingScheduledAt: {
          name: '_unpublishingScheduledAt'
          type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
        }
        _updatedAt: {
          name: '_updatedAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        asset: {
          name: 'asset'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'VideoFileField'; ofType: null }
          }
        }
        id: {
          name: 'id'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'ItemId'; ofType: null }
          }
        }
      }
    }
    VideoFileField: {
      kind: 'OBJECT'
      name: 'VideoFileField'
      fields: {
        _createdAt: {
          name: '_createdAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        _editingUrl: {
          name: '_editingUrl'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        _updatedAt: {
          name: '_updatedAt'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null }
          }
        }
        alt: {
          name: 'alt'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        author: {
          name: 'author'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        basename: {
          name: 'basename'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        blurUpThumb: {
          name: 'blurUpThumb'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        blurhash: {
          name: 'blurhash'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        colors: {
          name: 'colors'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'OBJECT'; name: 'ColorField'; ofType: null }
              }
            }
          }
        }
        copyright: {
          name: 'copyright'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        customData: {
          name: 'customData'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'CustomData'; ofType: null }
          }
        }
        exifInfo: {
          name: 'exifInfo'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'CustomData'; ofType: null }
          }
        }
        filename: {
          name: 'filename'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        focalPoint: {
          name: 'focalPoint'
          type: { kind: 'OBJECT'; name: 'focalPoint'; ofType: null }
        }
        format: {
          name: 'format'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        height: {
          name: 'height'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
        id: {
          name: 'id'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'UploadId'; ofType: null }
          }
        }
        md5: {
          name: 'md5'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        mimeType: {
          name: 'mimeType'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        notes: {
          name: 'notes'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        responsiveImage: {
          name: 'responsiveImage'
          type: { kind: 'OBJECT'; name: 'ResponsiveImage'; ofType: null }
        }
        size: {
          name: 'size'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
        smartTags: {
          name: 'smartTags'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
              }
            }
          }
        }
        tags: {
          name: 'tags'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: {
              kind: 'LIST'
              name: never
              ofType: {
                kind: 'NON_NULL'
                name: never
                ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
              }
            }
          }
        }
        thumbhash: {
          name: 'thumbhash'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        title: {
          name: 'title'
          type: { kind: 'SCALAR'; name: 'String'; ofType: null }
        }
        url: {
          name: 'url'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'String'; ofType: null }
          }
        }
        video: {
          name: 'video'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'OBJECT'; name: 'UploadVideoField'; ofType: null }
          }
        }
        width: {
          name: 'width'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'IntType'; ofType: null }
          }
        }
      }
    }
    VideoMp4Res: { name: 'VideoMp4Res'; enumValues: 'low' | 'medium' | 'high' }
    focalPoint: {
      kind: 'OBJECT'
      name: 'focalPoint'
      fields: {
        x: {
          name: 'x'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          }
        }
        y: {
          name: 'y'
          type: {
            kind: 'NON_NULL'
            name: never
            ofType: { kind: 'SCALAR'; name: 'FloatType'; ofType: null }
          }
        }
      }
    }
  }
}

import * as gqlTada from 'gql.tada'
import { Locale } from './locale'

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}
