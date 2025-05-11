{
  'targets': [
    {
      'target_name': 'binding',
      'sources': [ 'binding.cc' ],
      'includes': ['../common.gypi'],
    },
    {
      'target_name': 'binding2',
      'sources': [ 'binding2.cc' ],
      'includes': ['../common.gypi'],
    },
    {
      'target_name': 'binding_experimental',
      'sources': [ 'binding_experimental.cc' ],
      'includes': ['../common.gypi'],
      'defines': [ 'NAPI_EXPERIMENTAL' ],
    }
  ]
}
