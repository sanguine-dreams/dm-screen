import { useEffect } from "react";
import { DnDContext } from "../store/store";
import { useState } from "react";
import { api } from "../lib/axios";
import db from "../lib/Pocketbase";

function DndProvider({ children }) {
  const [spellCount, setSpellCount] = useState();
  const [conditions, setConditions] = useState([]);
  const [spells, setSpells] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(49);
  const [monsters, setMonsters] = useState([]);
  const [magicItems, setMagicItems] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [armor, setArmor] = useState([]);
  const [monsterFiltering, setMonsterFiltering] = useState({
    CR:false, search:""
  });
  const [armorFiltering, setArmorFiltering] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    api.get("/conditions/").then((response) => {
      setConditions(response.data.results);
    });
  }, []);
  useEffect(() => {
    api.get(`/spells/?page=${page}`).then((response) => {
      setSpellCount(response.data.count);
      setSpells(response.data.results);
    });
  }, [page, rowsPerPage]);
  useEffect(() => {
    api
      .get(
        `/monsters/${
          monsterFiltering.CR ? "?ordering=challenge_rating&" : ""
        }?page=${page}`
      )
      .then((response) => {
        setMonsters(response.data.results);
      });
  }, [monsterFiltering]);

  useEffect(() => {
    api.get(`/armor/${
      armorFiltering ? "?ordering=category" : ""
    }`).then((response) => {
      setArmor(response.data.results);
    });

    api.get(`/weapons/?page=${page}`).then((response) => {
      setWeapons(response.data.results);
    });

    api.get(`/magicitems/?page=${page}`).then((response) => {
      
      setMagicItems(response.data.results);
    });
  }, [page, rowsPerPage, armorFiltering]);

  // useEffect(() => {
  //   db.get(`/collections/Notes/records?expand=CampaignId`).then((response) => {
  //     setNotes(response.data.items)
  //     console.log(notes)
  //   })
  // }, [])

  return (
    <DnDContext.Provider
      value={{
        conditions,
        spells,
        monsters,
        page,
        rowsPerPage,
        setRowsPerPage,
        setPage,
        spellCount,
        weapons,
        armor,
        magicItems,
        monsterFiltering,
        setMonsterFiltering,
        armorFiltering, setArmorFiltering,
        notes, setNotes
      }}
    >
      {children}
    </DnDContext.Provider>
  );
}

export default DndProvider;
