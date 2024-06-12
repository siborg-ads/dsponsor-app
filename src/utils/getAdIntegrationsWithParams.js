const adParameters = {
  imageURL: {
    required: true,
    validation: /^\w+:\/\/[\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/))$/,
    variants: ["320x50", "1:1", "ipfs", "jpg"]
  },
  linkURL: {
    required: true,
    validation: /^https:\/\/[^\[\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/))$/
  },
  xCreatorHandle: {
    required: false,
    validation: /^@[A-Za-z0-9_]{1,15}$/
  },
  xSpaceId: {
    required: false,
    validation: /^\d[A-Za-z\d]{12}$/
  }
};

const adIntegrations = {
  DynamicBanner: {
    requiredParams: ["imageURL", "linkURL"],
    platforms: ["Newsletter", "React Native", "Web"]
  },
  ClickableLogosGrid: {
    requiredParams: ["imageURL", "linkURL"],
    platforms: ["Newsletter", "React Native", "Web"]
  },
  LogosGrid: {
    requiredParams: ["imageURL"],
    platforms: ["Newsletter", "Print", "React Native", "Web"]
  },
  xCreatorHighlight: {
    requiredParams: ["xCreatorHandle"],
    platforms: ["Newsletter", "React Native", "Web"]
  },
  xSpaceHighlight: {
    requiredParams: ["xSpaceId"],
    platforms: ["React Native", "Web"]
  }
};

function extractValidParams(adParams) {
  const params = {};
  adParams.forEach((param) => {
    params[param.base] = param.id;
  });
  return params;
}

export function getPossibleAdIntegrations(adParams) {
  const params = extractValidParams(adParams);
  const possibleIntegrations = [];

  for (const [key, integration] of Object.entries(adIntegrations)) {
    let isValid = true;
    let detailedParams = [];

    for (const reqParam of integration.requiredParams) {
      const [baseParam, variant] = reqParam.split("-");
      if (!(params[baseParam] && (!variant || params[baseParam].endsWith(variant)))) {
        isValid = false;
        break;
      }
      // Collecte des détails du paramètre requis pour l'intégration
      detailedParams.push({
        id: params[baseParam],
        base: baseParam,
        variants: adParameters[baseParam]?.variants || [],
        description: adParameters[baseParam]?.description || "No description available"
      });
    }

    if (isValid) {
      possibleIntegrations.push({
        name: key,
        requiredParams: detailedParams,
        platforms: integration.platforms
      });
    }
  }

  return possibleIntegrations;
}
