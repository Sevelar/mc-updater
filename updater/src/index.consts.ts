export const t = {
  error_unknown: (message: string): string => `An unknown error has occured! ${message}`,
  error_no_appdata_env: 'The application could not access the process.env.APPDATA variable.',
  error_file_not_exists: (path: string): string =>
    `The application could not access the given path: ${path}`,
  error_choose_directory: `The application could not access the chosen directory. This is not intended!`,
  error_no_mods_path: 'The application could not resolve the given mods path.',
  error_response_not_ok:
    'The application could not retrieve an OK status from the internal server!',
  error_response_no_body: 'The application could not retrieve a file from the internal server!',
  error_archive_error: (message: string): string =>
    `The application could not access the archive file! ${message}`,

  success_mods_path_changed: 'The mods path has been successfully changed.',
  success_modpack_updated: 'The modpack has been successfully updated!'
}
