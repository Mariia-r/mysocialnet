import React, {useState} from 'react';
import css from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import lookingForAJob from "../../../assets/images/lookingForAJob.jpg";
import notLookingForAJob from "../../../assets/images/notLookingForAJob.png";
import ProfileStatusWithHooks from './ProfileStatusWithHook';
import userPhoto from "../../../assets/images/user.jpg";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
  let [editMode, setEditMode] = useState(false);

  if(!props.profile){
    return <Preloader/>
  }

  const onMainPhotoSelected = (e) => {
    if(e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  }

  const onSubmit = (formData) => {
    props.saveProfile(formData).then(() => {
      setEditMode(false);
    }); 
  }

  return (
      <div>
        <div className={css.descriptionBlock}>
          <p className={css.nameUser}>{props.profile.fullName}</p>
          <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>

          <img src={props.profile.photos.large || userPhoto} alt="user" className={css.photoUser}/>
          <div>
            {props.isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
          </div>       
          <hr/>
          {editMode  
                ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/> 
                : <ProfileData profile={props.profile} 
                               isOwner={props.isOwner}
                               goToEditMode={() => {setEditMode(true)}}/>
          }
          
        </div>
      </div>
  );
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
  return(
    <div>
      <h4>Information</h4>
      <div className={css.blockAboutJob}>
        <p>Looking for a job:
         <img src={profile.lookingForAJob ? lookingForAJob : notLookingForAJob} 
              alt={profile.lookingForAJob ? "Looking for a job" : "Don't looking for a job"}/>
        </p>
        <p>Description a job:</p>
        <p>{profile.lookingForAJobDescription}</p>
      </div>
      <div>
        About me: {profile.aboutMe}
      </div>
      <div>
        <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact  key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
           })}
      </div>
      {isOwner && <div> <button onClick={goToEditMode}>Edit</button> </div>}
    </div>
  )
}

const Contact = ({contactTitle, contactValue}) => {
  return (
    <div className={css.contacts}>
      <i>{contactTitle}</i> : {contactValue}
    </div>
  )
}

export default ProfileInfo;
