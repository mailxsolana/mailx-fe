const size = {
    xs: '376px', // xs
    mobile: '576px', // sm
    tablet: '768px', // md
    laptop: '992px', // lg
    desktop: '1140px', // xl
    widescreen: '1200px', // xxl
    fullhd: '1400px', // xxxl
    fullhd2: '1600px', // xxxxl
    fullhd3: '1800px', // xxxxxl
    _2k: '2500px', // 2k
    _4k: '3600px', // 4k
}

export const deviceSize = {
    xs: 376,
    mobile: 576,
    tablet: 768,
    laptop: 992,
    desktop: 1140,
    widescreen: 1200,
    fullhd: 1400,
    fullhd2: 1600,
    fullhd3: 1800,
    _2k: 2500,
    _4k: 3600,
}

export const deviceMin = {
    xs: `(min-width: ${size.xs})`,
    sm: `(min-width: ${size.mobile})`,
    md: `(min-width: ${size.tablet})`,
    lg: `(min-width: ${size.laptop})`,
    xl: `(min-width: ${size.desktop})`,
    xxl: `(min-width: ${size.widescreen})`,
    xxxl: `(min-width: ${size.fullhd})`,
    xxxxl: `(min-width: ${size.fullhd2})`,
    xxxxxl: `(min-width: ${size.fullhd3})`,
    _2k: `(min-width: ${size._2k})`,
    _4k: `(min-width: ${size._4k})`,
}

export const deviceMax = {
    xs: `(max-width: ${size.xs})`,
    sm: `(max-width: ${size.mobile})`,
    md: `(max-width: ${size.tablet})`,
    lg: `(max-width: ${size.laptop})`,
    xl: `(max-width: ${size.desktop})`,
    xxl: `(max-width: ${size.widescreen})`,
    xxxl: `(max-width: ${size.fullhd})`,
    xxxxl: `(max-width: ${size.fullhd2})`,
    xxxxxl: `(max-width: ${size.fullhd3})`,
    _2k: `(max-width: ${size._2k})`,
    _4k: `(max-width: ${size._4k})`,
}