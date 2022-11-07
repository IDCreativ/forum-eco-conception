<?php

namespace App\Form;

use App\Entity\Poll;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class PollType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('question')
            ->add('visibility', ChoiceType::class, [
                'label' => 'Visibilité',
                'choices'  => [
                    'Visible' => true,
                    'Non visible' => false,
                ]
            ])
            ->add('status', ChoiceType::class, [
                'label' => 'État',
                'choices'  => [
                    'Actif' => true,
                    'Inactif' => false,
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Poll::class,
        ]);
    }
}
