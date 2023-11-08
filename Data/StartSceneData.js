const StartSceneData = {
  SofillaOnTietoa_1: {
    _comment: 'Tänne voi laittaa random kommentteja scenestä tai muuta?',
    type: 'linear',
    background: 'KoulunPiha.png',
    characters: null,
    text_type: 'infobox',
    text_position: 'middle',
    text: 't_sofi_outside_drama',
    next_scene: 'SofillaOnTietoa_2',
  },
  SofillaOnTietoa_2: {
    type: 'options',
    background: 'KoulunPiha.png',
    characters: ['npc_sofi_anxious'],
    text_type: 'dialogue',
    text_position: 'dialogue_left',
    text: 'sofi_outside_drama',
    player_options: [
      {
        text: 't_sofi_outside_option_1',
        next_scene: 'SofillaOnTietoaRoskiksille',
      },
      {
        text: 't_sofi_outside_option_2',
        next_scene: 'SofillaOnTietoaHaloo',
      },
    ],
  },
  SofillaOnTietoaHaloo: {
    type: 'options',
    background: 'KoulunPiha.png',
    characters: ['npc_sofi_angry'],
    text_type: 'dialogue',
    text_position: 'dialogue_left',
    text: 't_sofi_outside_drama_2',
    player_options: [
      {
        text: 't_sofi_outside_drama_option_deny',
        next_scene: 'EScene',
      },
      {
        text: 't_sofi_outside_drama_option_okay',
        next_scene: 'LydianHuolet_1',
      },
    ],
  },

  SofillaOnTietoaRoskiksille: {
    comment: '____________Tästä alkaa terkkari keskustelu',
    type: 'linear',
    background: 'Roskikset.png',
    characters: null,
    text_type: 'infobox',
    text_position: 'middle',
    text: 't_sofi_outside_towards_trash_narrator',
    next_scene: 'SofillaOnTietoaTerkkarille_1',
  },
  SofillaOnTietoaTerkkarille_1: {
    type: 'options',
    background: 'Roskikset.png',
    characters: null,
    text_type: 'infobox',
    text_position: 'dialogue_left',
    text: 't_sofi_outisde_nurse',
    player_options: [
      {
        text: 't_sofi_outside_nurse_option_yes',
        next_scene: 'wip',
      },
      {
        text: 't_sofi_outside_nurse_option_no',
        next_scene: 'wip',
      },
    ],
  },

  LydianHuolet_1: {
    comment:
      'tän scenen avulla vois pohtia animaatioita/fadein/hahmo focusta selkeyden vuoksi',
    type: 'linear',
    background: 'Roskikset.png',
    characters: ['npc_sofi_worried', 'npc_lydia'],
    text_type: 'dialogue',
    text_position: 'dialogue_left',
    text: 't_sofia_lydia_vape_1',
    next_scene: 'LydianHuolet_2',
  },
  LydianHuolet_2: {
    comment:
      'tän scenen avulla vois pohtia animaatioita/fadein/hahmo focusta selkeyden vuoksi',
    type: 'linear',
    background: 'Roskikset.png',
    characters: ['npc_sofi_worried', 'npc_lydia_annoyed'],
    text_type: 'dialogue',
    text_position: 'dialogue_right',
    text: 't_sofia_lydia_vape_2',
    next_scene: 'LydianHuolet_3',
  },
  LydianHuolet_3: {
    comment:
      'tän scenen avulla vois pohtia animaatioita/fadein/hahmo focusta selkeyden vuoksi',
    type: 'linear',
    background: 'Roskikset.png',
    characters: ['npc_sofi_worried', 'npc_lydia_annoyed'],
    text_type: 'dialogue',
    text_position: 'dialogue_left',
    text: 't_sofia_lydia_vape_3',
    next_scene: 'LydianHuolet_4',
  },
  LydianHuolet_4: {
    comment:
      'tän scenen avulla vois pohtia animaatioita/fadein/hahmo focusta selkeyden vuoksi',
    type: 'linear',
    background: 'Roskikset.png',
    characters: ['npc_sofi_worried', 'npc_lydia_anxious'],
    text_type: 'dialogue',
    text_position: 'dialogue_left',
    text: 't_sofia_lydia_vape_4',
    next_scene: 'LydianHuolet_5',
  },
  LydianHuolet_5: {
    comment:
      'tän scenen avulla vois pohtia animaatioita/fadein/hahmo focusta selkeyden vuoksi',
    type: 'linear',
    background: 'Roskikset.png',
    characters: ['npc_sofi_worried', 'npc_lydia_anxious'],
    text_type: 'dialogue',
    text_position: 'dialogue_right',
    text: 't_sofia_lydia_vape_5',
    next_scene: 'wip',
  },
};
export default StartSceneData;
