enum VoiceNameEnum {
  Zephyr = "Zephyr",
  Puck = "Puck",
  Charon = "Charon",
  Kore = "Kore",
  Fenrir = "Fenrir",
  Leda = "Leda",
  Orus = "Orus",
  Aoede = "Aoede",
  Callirrhoe = "Callirrhoe",
  Autonoe = "Autonoe",
  Enceladus = "Enceladus",
  Iapetus = "Iapetus",
  Umbriel = "Umbriel",
  Algieba = "Algieba",
  Despina = "Despina",
  Erinome = "Erinome",
  Algenib = "Algenib",
  Rasalgethi = "Rasalgethi",
  Laomedeia = "Laomedeia",
  Achernar = "Achernar",
  Alnilam = "Alnilam",
  Schedar = "Schedar",
  Gacrux = "Gacrux",
  Pulcherrima = "Pulcherrima",
  Achird = "Achird",
  Zubenelgenubi = "Zubenelgenubi",
  Vindemiatrix = "Vindemiatrix",
  Sadachbia = "Sadachbia",
  Sadaltager = "Sadaltager",
  Sulafat = "Sulafat",
}

const AvailableVoices: {
  voiceName: VoiceNameEnum;
  description: string;
  displayString: string;
}[] = [
  {
    voiceName: VoiceNameEnum.Zephyr,
    description: "Bright",
    displayString: "Voice 1",
  },
  {
    voiceName: VoiceNameEnum.Puck,
    description: "Upbeat",
    displayString: "Voice 2",
  },
  {
    voiceName: VoiceNameEnum.Charon,
    description: "Informative",
    displayString: "Voice 3",
  },
  {
    voiceName: VoiceNameEnum.Kore,
    description: "Firm",
    displayString: "Voice 4",
  },
  {
    voiceName: VoiceNameEnum.Fenrir,
    description: "Excitable",

    displayString: "Voice 5",
  },
  {
    voiceName: VoiceNameEnum.Leda,
    description: "Youthful",
    displayString: "Voice 6",
  },
  {
    voiceName: VoiceNameEnum.Orus,
    description: "Firm",
    displayString: "Voice 7",
  },
  {
    voiceName: VoiceNameEnum.Aoede,
    description: "Breezy",
    displayString: "Voice 8",
  },
  {
    voiceName: VoiceNameEnum.Callirrhoe,
    description: "Easy-going",
    displayString: "Voice 9",
  },
  {
    voiceName: VoiceNameEnum.Autonoe,
    description: "Bright",
    displayString: "Voice 10",
  },
  {
    voiceName: VoiceNameEnum.Enceladus,
    description: "Breathy",
    displayString: "Voice 11",
  },
  {
    voiceName: VoiceNameEnum.Iapetus,
    description: "Clear",
    displayString: "Voice 12",
  },
  {
    voiceName: VoiceNameEnum.Umbriel,
    description: "Easy-going",
    displayString: "Voice 13",
  },
  {
    voiceName: VoiceNameEnum.Algieba,
    description: "Smooth",
    displayString: "Voice 14",
  },
  {
    voiceName: VoiceNameEnum.Despina,
    description: "Smooth",
    displayString: "Voice 15",
  },
  {
    voiceName: VoiceNameEnum.Erinome,
    description: "Clear",
    displayString: "Voice 16",
  },
  {
    voiceName: VoiceNameEnum.Algenib,
    description: "Gravelly",
    displayString: "Voice 17",
  },
  {
    voiceName: VoiceNameEnum.Rasalgethi,
    description: "Informative",
    displayString: "Voice 18",
  },
  {
    voiceName: VoiceNameEnum.Laomedeia,
    description: "Upbeat",
    displayString: "Voice 19",
  },
  {
    voiceName: VoiceNameEnum.Achernar,
    description: "Soft",
    displayString: "Voice 20",
  },
  {
    voiceName: VoiceNameEnum.Alnilam,
    description: "Firm",
    displayString: "Voice 21",
  },
  {
    voiceName: VoiceNameEnum.Schedar,
    description: "Even",
    displayString: "Voice 22",
  },
  {
    voiceName: VoiceNameEnum.Gacrux,
    description: "Mature",
    displayString: "Voice 23",
  },
  {
    voiceName: VoiceNameEnum.Pulcherrima,
    description: "Forward",
    displayString: "Voice 24",
  },
  {
    voiceName: VoiceNameEnum.Achird,
    description: "Friendly",
    displayString: "Voice 25",
  },
  {
    voiceName: VoiceNameEnum.Zubenelgenubi,
    description: "Casual",
    displayString: "Voice 26",
  },
  {
    voiceName: VoiceNameEnum.Vindemiatrix,
    description: "Gentle",
    displayString: "Voice 27",
  },
  {
    voiceName: VoiceNameEnum.Sadachbia,
    description: "Lively",
    displayString: "Voice 28",
  },
  {
    voiceName: VoiceNameEnum.Sadaltager,
    description: "Knowledgeable",
    displayString: "Voice 29",
  },
  {
    voiceName: VoiceNameEnum.Sulafat,
    description: "Warm",
    displayString: "Voice 30",
  },
];

export { VoiceNameEnum, AvailableVoices };
