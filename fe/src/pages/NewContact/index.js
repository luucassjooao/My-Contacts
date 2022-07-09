import { useRef } from 'react';
import PageHeader from '../../components/PageHeader';

import ContactForm from '../../components/ContactForm';
import ContactsServices from '../../services/ContactsServices';
import toast from '../../utils/toast';

export default function NewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

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

  return (
    <>
      <PageHeader title="Novo Contato" />
      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} ref={contactFormRef} />
    </>
  );
}
