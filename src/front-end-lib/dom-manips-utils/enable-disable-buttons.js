// mode: add, or remove

function disable_class_adder_remover_maincards(mode){
  let maincards = document.getElementsByClassName('main-card')
  for (let i = 0; i < maincards.length; i++) {
    const maincard = maincards[i];
    mode == 'remove' && maincard.classList.remove("disable");
    mode == 'add' && maincard.classList.add("disable");
  }
}


function disable_class_adder_remover_button(mode, htmlEle_id){

  const button = document.getElementById(htmlEle_id)

  if (button){
    mode == 'remove' && button.classList.remove("disable")
    mode == 'add' && button.classList.add("disable")
    return
  }
}


module.exports = {
  disable_class_adder_remover_maincards,
  disable_class_adder_remover_button
}