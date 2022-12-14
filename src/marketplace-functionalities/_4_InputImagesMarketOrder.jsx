import '../style/reactDivMobile.css'
import './style/market-images.css'
import './style/_4_InputImagesMarketOrder.css'



import ImagesWDeletionLoop from './ImagesWDeletionLoop'
import MarketSubmissionButton from './MarketSubmissionButton'



// Image sources: https://unsplash.com/

// TODO make the image cards after upload slidable, i.e. be able to drag and drop and switch each Image component, This is necessary to re organize the order

class _4_InputImagesMarketOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.addimages = this.addimages.bind(this)
    this.reduceimage = this.reduceimage.bind(this)
    console.log(userId)
  }

  makeArrayOutOf(selectedFiles) {
    let selectedFilesArray = []
    for (const FileKey in selectedFiles) {
      if (isNaN(parseInt(FileKey))) continue
      selectedFilesArray.push(selectedFiles[FileKey])
    }
    return selectedFilesArray
  }

  addimages(e = null) {

    let input = document.getElementById('image-select')
    let selectedFiles = input.files
    let selectedFilesArr = this.makeArrayOutOf(selectedFiles)

    let dt = new DataTransfer()
    let passed, popup_state;

    let Old_Files_arr = this.props.filelist // Past state before reseting to new at the end of this function
    let Total_trying = Old_Files_arr.length + selectedFiles.length

    let Files_arr_names_build = []
    let Files_build = []
    let selectedFilesArr_names = []
    let number_we_can_add = selectedFiles.length // all new addable


    Files_arr_names_build = Old_Files_arr.map((old_file) => { return old_file.name })
    selectedFilesArr_names = selectedFilesArr.map((file) => { return file.name })

    function compare(a1, a2) {
      let count
      count = a1.filter(ele => { return a2.includes(ele) }).length;
      return count
    }

    let countToSkipAlreadyPresentUploads = compare(Files_arr_names_build, selectedFilesArr_names);


    ({ passed, popup_state } = this.validateImagesTypes(selectedFiles));
    console.log(passed, popup_state)

    if (!passed) {

      Files_build = Old_Files_arr

      // reput the old files
      for (let i = 0; i < Files_build.length; i++) {
        const File = Files_build[i];
        dt.items.add(File)
      }

      input.files = dt.files

      let ret_handleimages = this.props.handleimages(Files_arr_names_build, Files_build, popup_state)

      // this.props.setpopup(popup_state)
      return false
    }



    // Old ones present
    if (Old_Files_arr.length != 0) {

      Files_build = Old_Files_arr

      // reput the old files
      for (let i = 0; i < Files_build.length; i++) {
        const File = Files_build[i];
        dt.items.add(File)
      }

    }


    if (Total_trying >= 5) {
      number_we_can_add = Math.abs(5 - Old_Files_arr.length);
    }


    for (let i = 0; i < number_we_can_add + countToSkipAlreadyPresentUploads; i++) {
      const Fileadd = selectedFilesArr[i];
      if (Files_arr_names_build.includes(Fileadd.name)) continue
      Files_arr_names_build.push(Fileadd.name)
      Files_build.push(Fileadd)
      dt.items.add(Fileadd)
    }


    input.files = dt.files

    let ret_handleimages = this.props.handleimages(Files_arr_names_build, Files_build)

    return true
  }


  reduceimage(_image_name, e) {
    console.log(_image_name)

    let input = document.getElementById('image-select')
    let selectedFilesArr = this.props.filelist

    let dt = new DataTransfer()
    let Files_build = []

    let files_names = []

    for (let i = 0; i < selectedFilesArr.length; i++) {
      const File = selectedFilesArr[i];
      if (File.name == _image_name) continue
      dt.items.add(File)
      Files_build.push(File)
      files_names.push(File.name)
    }

    input.files = dt.files

    // State update's UI, because prop changes and rerenders. See remarque at the bottom
    let ret_handleimages = this.props.handleimages(files_names, Files_build)

    return
  }

  render() {
    console.log("\n\n\n\n\nSTART\n\n\n\n")
    console.log("render()->_4_InputImagesMarketOrder")

    let filelist = this.props.filelist


    return (
      <React.Fragment>
        <div id='images-container'>
          <ImagesWDeletionLoop
            filelist={filelist}
            reduceimage={this.reduceimage}
          />
        </div>


        <form className="form" id="form_id">
          <label htmlFor="image-select">Image(s)</label>
          <input type="file" name="image" id="image-select" multiple onChange={(e) => {
            e.preventDefault()
            let ret_addimages = this.addimages(e)
            return
          }} />

        <input type="text" name="hny_spm"/>


          <MarketSubmissionButton
            setpopup={this.props.setpopup}
            formData={this.props.formData}
          />

        </form>


        <button onClick={(e) => {
          this.props.previousStep(e)
        }}>Previous</button>
      </React.Fragment>
    )
  }


  validateImagesTypes(_selectedFiles) {

    const supportedTypes = [
      "image/png",
      "image/jpeg",
      "image/apng",
      "image/avif",
      "image/gif",
      "image/webp",
    ];

    console.log(_selectedFiles, supportedTypes)

    let not_supported_retrieved = []

    for (const FileKey in _selectedFiles) {

      if (isNaN(parseInt(FileKey))) {
        continue
      }

      if (!supportedTypes.includes(_selectedFiles[FileKey].type)) {
        not_supported_retrieved.push(_selectedFiles[FileKey].type)
      }

    }

    if (not_supported_retrieved.length != 0) {
      not_supported_retrieved = [...new Set(not_supported_retrieved)];
      let error_msg = `${not_supported_retrieved.join(' ')} image types are not supported.`
      let error_msg_retrieved_if_any = error_msg

      return { passed: false, popup_state: error_msg_retrieved_if_any };
    }

    return { passed: true, popup_state: undefined };

  }
}

export default _4_InputImagesMarketOrder

// TODO get people to onboard to your company on angellist.co


// Ramarque
// In order for props to change, they need to be updated by the parent component. This means the parent would have to re-render, which will trigger re-render of the child component regardless of its props.