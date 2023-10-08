import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import React, { useEffect, useRef } from "react";
import {
  createTeam,
  deleteTeam,
  detailTeam,
  resetMessage,
  teamList,
  updateTeam
} from "../../features/teams/teamSlice";
import { useDispatch, useSelector } from "react-redux";

import { ApiEndPoints } from "../../constants/ApiEndPoints";
import { Button } from "primereact/button";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/Modal";
import TeamCard from "../../components/TeamCard";
import TeamForm from "../../components/Form";
import { Toast } from "primereact/toast";
import { fetchPlayerList } from "../../features/players/playerAPI";
import { toggleModalAction } from "../../features/system/systemSlice";

const Team = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();

  const { data, detail, returnMessage } = useSelector(state => state.team);
  const {
    data: { data: players }
  } = useSelector(state => state.player);
  const { create: createdModal, update: updatedModal } = useSelector(
    ({ system }) => system.modal
  );

  if (returnMessage !== null) {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: returnMessage,
      life: 1000
    });
  }

  const fetchData = () => {
    dispatch(teamList(data));
    dispatch(resetMessage());
    dispatch(
      fetchPlayerList({
        url: `${ApiEndPoints.playerList}?page=${1}&&per_page=${256}`
      })
    );
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnMessage]);

  const addModal = () => {
    dispatch(detailTeam(null));
    dispatch(toggleModalAction({ create: true }));
  };

  const editModal = values => {
    dispatch(detailTeam(values));
    dispatch(toggleModalAction({ update: true }));
  };

  const hideModal = () => {
    dispatch(toggleModalAction({ update: false }));
    dispatch(toggleModalAction({ create: false }));
  };

  const onAddTeam = async (values, { setSubmitting }) => {
    setSubmitting(true);
    dispatch(createTeam(values));
    hideModal();
  };

  const onEditTeam = async (values, { setSubmitting }) => {
    let modifiedValues = Object.assign({ ...detail, data: values });
    setSubmitting(true);
    dispatch(updateTeam(modifiedValues));
    hideModal();
  };

  const onDelete = id => {
    dispatch(deleteTeam(id));
  };

  const confirmDelete = (event, id) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete this team?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => onDelete(id)
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmPopup />
      <Layout>
        <h2 className="flex justify-content-center mb-4 mt-4">Team List</h2>
        <div className="card flex justify-content-end mt-5">
          <Button label="Add Team" icon="pi pi-plus" onClick={addModal} />
          <Modal header={"Add Team"} visible={createdModal} onClose={hideModal}>
            <TeamForm isCreate={true} players={players} onSubmit={onAddTeam} />
          </Modal>
          <Modal
            header={"Update Team"}
            visible={updatedModal}
            // onClick={editModal}
            onClose={hideModal}
          >
            <TeamForm
              isCreate={false}
              players={players}
              onSubmit={onEditTeam}
            />
          </Modal>
        </div>
        {data &&
          data?.map(team => (
            <TeamCard
              key={team?.id}
              name={team?.data?.name}
              playerCount={team?.data?.player?.length}
              region={team?.data?.region}
              country={team?.data?.country}
              onDelete={e => confirmDelete(e, team?.id)}
              onEdit={() => editModal(team)}
            />
          ))}
      </Layout>
    </>
  );
};

export default Team;
