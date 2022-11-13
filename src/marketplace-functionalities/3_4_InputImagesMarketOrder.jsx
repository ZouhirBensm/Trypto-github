
import React from 'react'
import '../style/reactDivMobile.css'


// Image sources: https://unsplash.com/

class _4_InputImagesMarketOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // Files_array: [] // File[]
    }
    this.addimages = this.addimages.bind(this)
    this.reduceimage = this.reduceimage.bind(this)
  }



  updateUI() {
    let UI

    UI = this.props.images.map((image_name, index) => {
      // let item_number = image_name.split("-")[1]
      return <React.Fragment key={index}>
        <span>{image_name}</span>
        <button onClick={(e) => {
          e.preventDefault()
          let reduceimage = this.reduceimage(image_name, e)
          return
        }}>X</button>
        <br />
      </React.Fragment>
    })
    return UI
  }

  makeArrayOutOf(selectedFiles){
    let selectedFilesArray = []
    for (const FileKey in selectedFiles) {
      if (isNaN(parseInt(FileKey))) break
      selectedFilesArray.push(selectedFiles[FileKey])
    }
    return selectedFilesArray
  }

  addimages(e = null) {

    let input = document.getElementById('image-select')
    let selectedFiles = input.files
    let selectedFilesArr = this.makeArrayOutOf(selectedFiles)

    let Old_Files_arr = this.props.filelist // Past state before reseting to new at the end of this function
    let Total_trying = Old_Files_arr.length + selectedFiles.length 

    let dt = new DataTransfer()
    let Files_arr_names_build = []
    let Files_build = []
    let number_we_can_add = selectedFiles.length // all new addable


    // Old ones present
    if(Old_Files_arr.length != 0) {

      Files_arr_names_build = Old_Files_arr.map((old_file)=>{return old_file.name})
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



    // let files_names = []

    for (let i = 0; i < number_we_can_add; i++) {
      const Fileadd = selectedFilesArr[i];
      if(Files_arr_names_build.includes(Fileadd.name)) continue
      Files_arr_names_build.push(Fileadd.name)
      Files_build.push(Fileadd)
      dt.items.add(Fileadd)
    }
    








    input.files = dt.files








    let ret_handleimages = this.props.handleimages(Files_arr_names_build, Files_build)

  



  }


  reduceimage(_image_name, e) {

    let input = document.getElementById('image-select')
    let selectedFilesArr = this.props.filelist

    // Using the selectedFilesArr below as the current array of Files can work as well
    // let selectedFiles = input.files
    // let selectedFilesArr = this.makeArrayOutOf(selectedFiles)

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

    let UI = this.updateUI()


    return (
      <React.Fragment>

        <div>
          {UI}
        </div>

        {/* Old */}
        {/* <button onClick={(e) => {
          let ret_addimages = this.addimages()
          console.log(ret_addimages)
          return
        }}>
          Add Photo
        </button> */}


        {/* New */}
        {/* action="/upload/post" method="post" encType="multipart/form-data" */}
        <form className="form" id="form_id">
          <label htmlFor="image-select">Image(s)</label>
          {/* required value={this.props.images} onChange={(e)=>{this.props.handleimage()}} */}
          <input type="file" name="image" id="image-select" multiple onChange={(e) => {
            e.preventDefault()
            let ret_addimages = this.addimages(e)
          }} />

          <button type="submit" onClick={(e) => {
            let ret_process1 = this.process1()
            let ret_process2 = this.process2()
            let ret_process3 = this.process3()
            return
          }}>api call</button>

        </form>


        <br /><br />
        {/* Original */}
        <form action="/upload/post" method="post" encType="multipart/form-data">
          <input type="file" name="image" /> <br /><br />
          <button type="submit">Upload</button>
        </form>



        <br /><br /><br />
        <button onClick={(e) => {
          this.props.previousStep(e)
        }}>Previous</button>
      </React.Fragment>
    )
  }


  process1() {
    console.log("process1")
  }
  process2() {
    console.log("process2")
  }
  process3() {
    console.log("process3")
  }
}

export default _4_InputImagesMarketOrder

// TODO finish https://www.ycombinator.com/apply registration
// TODO get people to onboard to your company on angellist.co


// Ramarque
// In order for props to change, they need to be updated by the parent component. This means the parent would have to re-render, which will trigger re-render of the child component regardless of its props.