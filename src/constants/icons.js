import * as PiIcons from "react-icons/pi";
import * as HiIcons from "react-icons/hi2";
import * as CiIcons from "react-icons/ci";

const iconPacks = {
  PiIcons,
  HiIcons,
  CiIcons,
};

export const icons = {
  Food: { iconPack: "PiIcons", icon: "PiPizza" },
  Entertainment: { iconPack: "HiIcons", icon: "HiOutlineGift" },
  Travel: { iconPack: "CiIcons", icon: "CiRollingSuitcase" },
};

export const getIconComponent = (category) => {
  const { iconPack, icon } = icons[category];
  const IconPack = iconPacks[iconPack];
  const Icon = IconPack?.[icon];
  if (Icon) {
    return Icon;
  }
  return null;
};
