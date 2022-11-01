import { useRef } from 'react';
import ContactsServices from '../../services/ContactsServices';
import toast from '../../utils/toast';

export default function useNewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(contact) {
    try {
      await ContactsServices.createContacts(contact);

      contactFormRef.current.resetFilds();

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um error ao cadastrar o contato!',
      });
    }
  }

  return {
    contactFormRef,
    handleSubmit,
  };
}
