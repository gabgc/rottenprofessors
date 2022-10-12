// credit to ghoshnirmalya for parts this hook

import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

const useOutsideClick = (
  dropdownRef: RefObject<HTMLDivElement>,
  inputRef: RefObject<HTMLInputElement>,
  setValue: Dispatch<SetStateAction<string>>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setValue("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, inputRef]);
};

export default useOutsideClick;
