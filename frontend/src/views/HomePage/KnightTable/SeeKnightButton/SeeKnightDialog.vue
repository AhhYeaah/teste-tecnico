<script lang="ts">
import DialogComponent from "@components/Dialog/DialogComponent.vue";
import { AttributeType } from "@utils/types/AttributesEntity";
import { KnightEntity } from "@utils/types/KnightEntity";
import { Vueform } from "@vueform/vueform/dist/tailwind";

export type FormValues = KnightEntity;

export default {
    data() {
        return {
            attributes: [
                { label: "Força", value: AttributeType.STRENGTH },
                { label: "Destreza", value: AttributeType.DEXTERITY },
                { label: "Constituição", value: AttributeType.CONSTITUTION },
                { label: "Inteligência", value: AttributeType.INTELLIGENCE },
                { label: "Sabedoria", value: AttributeType.WISDOM },
                { label: "Carisma", value: AttributeType.CHARISMA },
            ],
        };
    },
    props: {
        initialValues: {
            type: Object as () => KnightEntity,
            required: false,
        }
    },
    methods: {
    },
    components: {
        DialogComponent,
    },
};
</script>
<template>
    <DialogComponent button-content="Editar" title="Visualizar um knight">
        <div>
            <Vueform :key="JSON.stringify(initialValues)" :default="initialValues" :endpoint="false" ref="form">
                <template #empty>
                    <div class="border-b pb-1 mb-3">
                        <h3 class="text-lg font-semibold mb-1">Informações do Knight</h3>
                    </div>

                    <GroupElement name="first">
                        <TextElement :disabled="true" :floating="false" name="name" label="Nome" :rules="['required']"
                            placeholder="Natsu Dragneel">
                        </TextElement>
                        <TextElement :disabled="true" :floating="false" name="nickname" label="Apelido"
                            :rules="['required']" placeholder="Salamander">
                        </TextElement>
                        <DateElement :disabled="true" :floating="false" name="birthday" label="Aniversário"
                            display-format="MMMM DD, YYYY" :rules="['required']" placeholder="August 2, 2006" />
                    </GroupElement>

                    <div class="border-b pb-1 mb-3 mt-3">
                        <h3 class="text-lg font-semibold mb-1">Armas</h3>
                    </div>
                    <ListElement :min="1" :disabled="true" :initial="1" name="weapons" add-text="+ Adicionar Arma">
                        <template #default="{ index }">
                            <h3 class="col-span-12">{{ index + 1 }}º Arma</h3>
                            <ObjectElement :name="index" class="border-b p-3 pt-0">
                                <TextElement :disabled="true" :floating="false" name="name" label="Nome"
                                    :rules="['required']" placeholder="Túmulo do Lobo"></TextElement>
                                <SelectElement :disabled="true" :floating="false" name="attr" label="Atributo"
                                    :native="true" :items="attributes" :columns="{ default: 12, md: 8 }"
                                    placeholder="Escolha um atributo principal..." :rules="['required']" />
                                <TextElement :disabled="true" :floating="false" name="mod" input-type="number"
                                    label="Modificador" :rules="['required', 'numeric']"
                                    :columns="{ default: 12, md: 4 }" placeholder="3" />
                            </ObjectElement>
                        </template>
                    </ListElement>
                    <span class="text-xs text-gray-400">A primeira arma selecionada será a arma equipada</span>

                    <div class="border-b pb-1 mb-3 mt-3">
                        <h3 class="text-lg font-semibold mb-1">Atributos</h3>
                    </div>
                    <GroupElement name="third">
                        <ObjectElement name="attributes">
                            <TextElement :disabled="true" v-for="attribute of attributes" :name="attribute.value"
                                input-type="number" :label="attribute.label" :default="8" :force-numbers="true"
                                :rules="['required', 'numeric', 'min:8', 'max:20']" :columns="{ default: 12, md: 6 }" />
                        </ObjectElement>

                        <SelectElement :disabled="true" :floating="false" name="keyAttribute" label="Atributo principal"
                            :native="true" :items="attributes" :rules="['required']"
                            placeholder="Qual a melhor qualidade do seu knight?" />
                    </GroupElement>
                </template>
            </Vueform>
        </div>
    </DialogComponent>
</template>
