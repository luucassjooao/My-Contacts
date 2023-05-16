import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContactsServices from '../../services/ContactsServices';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controller = new AbortController();
    async function loadContact() {
      try {
        const contact = await ContactsServices.getContactById(id, controller.signal);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact);
          setIsLoading(false);
          setContactName(contact.name);
        });
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          safeAsyncAction(() => {
            navigate('/', { replace: true });
            toast({
              type: 'danger',
              text: 'Contact not found!',
            });
          });
        }
      }
    }

    loadContact();

    return () => {
      controller.abort();
    };
  }, [id, safeAsyncAction, navigate]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsServices.updateContact(id, contact);

      setContactName(contactData.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um error ao editar o contato!',
      });
    }
  }

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
